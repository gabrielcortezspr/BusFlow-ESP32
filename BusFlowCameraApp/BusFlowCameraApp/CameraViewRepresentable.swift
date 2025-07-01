//
//  CameraViewRepresentable.swift
//  BusFlowCameraApp
//
//  Created by Italo Guilherme Monte on 30/05/25.
//

import SwiftUI
import AVFoundation
import Vision
import CoreML

struct CameraRepresentable: UIViewControllerRepresentable {
    @Binding var peopleCount: Int
    
    func makeUIViewController(context: Context) -> CameraController {
        let controller = CameraController()
        controller.onPeopleCountUpdate = { count in
            DispatchQueue.main.async {
                self.peopleCount = count
            }
        }
        return controller
    }
    
    func updateUIViewController(_ uiViewController: CameraController, context: Context) {}
}
