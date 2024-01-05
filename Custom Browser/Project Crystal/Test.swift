import Foundation
import SwiftUI


struct Test: View {

    @State var bruh = ""
    
    var body: some View {
        Text("Use the popup or the shortcut to create a new window").fontWeight(.light).padding(100)
//        TextField("", text: $bruh)
    }
}
