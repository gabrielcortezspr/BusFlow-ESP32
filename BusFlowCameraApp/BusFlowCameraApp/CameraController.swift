//
//  CameraController.swift
//  BusFlowCameraApp
//
//  Created by Italo Guilherme Monte on 30/05/25.
//

import UIKit
import AVFoundation
import Vision
import CoreML

class CameraController: UIViewController, AVCaptureVideoDataOutputSampleBufferDelegate {
    var onPeopleCountUpdate: ((Int) -> Void)?
    
    private let captureSession = AVCaptureSession()
    private var previewLayer: AVCaptureVideoPreviewLayer!
    private var model: VNCoreMLModel?
    
    private var currentPersonCount = 0
    private var timer: Timer?
    private var ip: String = "192.168.207.23"
    private var port: String = "8888"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupCamera()
        setupModel()
        startSendingDataTimer()

    }
    
    deinit {
        timer?.invalidate()
    }
    
    private func startSendingDataTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 3.0, repeats: true) { [weak self] _ in
            self?.sendPersonCountToAPI()
        }
    }
    
    private func sendPersonCountToAPI() {
        let url = URL(string: "http://\(ip):\(port)/bus-stop/quantity")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let payload: [String: Any] = [
            "busStopId": 4,
            "quantity": currentPersonCount,
        ]
        
        request.httpBody = try? JSONSerialization.data(withJSONObject: payload)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Erro ao enviar dados: \(error)")
            } else {
                print("Dados enviados com sucesso")
            }
        }.resume()
    }
    
    
    private func setupCamera() {
        captureSession.sessionPreset = .high
        
        guard let device = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: device) else { return }
        
        captureSession.addInput(input)
        
        let output = AVCaptureVideoDataOutput()
        output.setSampleBufferDelegate(self, queue: DispatchQueue(label: "videoQueue"))
        captureSession.addOutput(output)
        
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.videoGravity = .resizeAspectFill
        previewLayer.frame = view.bounds
        view.layer.addSublayer(previewLayer)
        
        DispatchQueue.global(qos: .userInitiated).async {
            self.captureSession.startRunning()
        }
    }
    
    private func setupModel() {
        do {
            let yoloModel = try YOLOv3FP16(configuration: MLModelConfiguration()).model
            model = try VNCoreMLModel(for: yoloModel)
        } catch {
            print("Erro ao carregar modelo: \(error)")
        }
    }

    
    func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        guard let model = model else { return }

        let request = VNCoreMLRequest(model: model) { [weak self] request, error in
            guard let results = request.results as? [VNRecognizedObjectObservation] else { return }
            let personCount = results.filter { $0.labels.first?.identifier == "person" }.count
            self?.currentPersonCount = personCount
            self?.onPeopleCountUpdate?(personCount)
        }

        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .right)
        try? handler.perform([request])
    }
}
