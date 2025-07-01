//
//  CameraView.swift
//  BusFlowCameraApp
//
//  Created by Italo Guilherme Monte on 30/05/25.
//

import SwiftUI

struct CameraView: View {
    @State private var peopleCount = 0
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            CameraRepresentable(peopleCount: $peopleCount)
                .ignoresSafeArea()
            
            Text("Pessoas: \(peopleCount)")
                .font(.largeTitle)
                .foregroundColor(.white)
                .padding()
                .background(Color.black.opacity(0.6))
                .cornerRadius(10)
                .padding()
        }
    }
}
