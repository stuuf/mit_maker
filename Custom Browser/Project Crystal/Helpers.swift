//
//  Browser.swift
//  Project Crystal
//
//  Created by Nicholas Kang on 2/24/23.
//

import SwiftUI
import KeyboardShortcuts



struct AnimatedStyle: ButtonStyle {
     
     @State private var hover = false
     var disabled:Bool = false
    var animations:Bool

     func makeBody(configuration: Self.Configuration) -> some View {
         configuration.label
             .background(Circle().fill(Color(white: 0.6).opacity(!disabled ? (configuration.isPressed ? 0.25 : hover ? 0.1 : 0) : 0 )).frame(width: 25, height: 25).contentShape(Circle()))
             .animation(
                animations ? .easeInOut(duration: 0.1) : nil,
                 value: hover
             )
             .onHover { over in
                 self.hover = over
             }
     }
 }
 
struct GrowStyle: ButtonStyle {
    
    @State private var hover = false
    var animations:Bool

    func makeBody(configuration: Self.Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.95 : (hover ? 1.1 : 1.0))
            .animation(
                animations ? .easeInOut(duration: 0.1) : nil,
                value: hover
            )
            .onHover { over in
                self.hover = over
            }
    }
}



struct XAnimatedStyle: ButtonStyle {
    
    @State var hover = false
    var animations:Bool

    func makeBody(configuration: Self.Configuration) -> some View {
        configuration.label
//            .contentShape(Circle())
            .background(Circle().fill(Color(white: 0.6).opacity(configuration.isPressed ? 0.25 : hover ? 0.1 : 0)).frame(width: 15, height: 15)).contentShape(Circle())
            .animation(
                animations ? .easeInOut(duration: 0.1) : nil,
                value: hover
            )
            .onHover { over in
                self.hover = over
            }
    }
}




struct RoundedCorners: View {
    var color: Color = .blue
    var tl: CGFloat = 0.0
    var tr: CGFloat = 0.0
    var bl: CGFloat = 0.0
    var br: CGFloat = 0.0
    
    var body: some View {
        GeometryReader { geometry in
            Path { path in
                
                let w = geometry.size.width
                let h = geometry.size.height

                // Make sure we do not exceed the size of the rectangle
                let tr = min(min(self.tr, h/2), w/2)
                let tl = min(min(self.tl, h/2), w/2)
                let bl = min(min(self.bl, h/2), w/2)
                let br = min(min(self.br, h/2), w/2)
                
                path.move(to: CGPoint(x: w / 2.0, y: 0))
                path.addLine(to: CGPoint(x: w - tr, y: 0))
                path.addArc(center: CGPoint(x: w - tr, y: tr), radius: tr, startAngle: Angle(degrees: -90), endAngle: Angle(degrees: 0), clockwise: false)
                path.addLine(to: CGPoint(x: w, y: h - br))
                path.addArc(center: CGPoint(x: w - br, y: h - br), radius: br, startAngle: Angle(degrees: 0), endAngle: Angle(degrees: 90), clockwise: false)
                path.addLine(to: CGPoint(x: bl, y: h))
                path.addArc(center: CGPoint(x: bl, y: h - bl), radius: bl, startAngle: Angle(degrees: 90), endAngle: Angle(degrees: 180), clockwise: false)
                path.addLine(to: CGPoint(x: 0, y: tl))
                path.addArc(center: CGPoint(x: tl, y: tl), radius: tl, startAngle: Angle(degrees: 180), endAngle: Angle(degrees: 270), clockwise: false)
                path.closeSubpath()
            }
            .fill(.clear)
        }.background(.white)
    }
}






struct SearchBar: NSViewRepresentable {
//    var text: Binding<String>?
    var navState: NavigationState
    var incognito: Bool
    var font:NSFont
    var focused:Bool
    var onSubmit: (String) -> ()
    var onChange: (String) -> (String?)
//
//    var internalText:String = "" {
//        didSet {
//            text = internalText
//            print("internal text set to: \(internalText),  and text set to: \(text)")
//        }
//    }
    
    func makeNSView(context: Context) -> NSTextField {
        let textField = NSTextField()
//        textField.cell = MyCell()
        
        textField.isEditable = true
        textField.isSelectable = true
        textField.delegate = context.coordinator
        textField.focusRingType = .none
        textField.isBezeled = false
        textField.drawsBackground = false
                
        textField.cell?.isScrollable = true
//        textField.lineBreakMode = .byCharWrapping
        textField.usesSingleLineMode = true

        
        textField.textColor = incognito ? .white : .black
        textField.font = font
        
        textField.preferredMaxLayoutWidth = textField.intrinsicContentSize.width
        textField.maximumNumberOfLines = 1


        return textField
    }
    
    func updateNSView(_ nsView: NSTextField, context: Context) {
        
        
        guard let input = (navState.selectedWebIndex.map { navState.webViews[$0].domain }) else {return}

//        print("updated with text: \(input)")
        
        let placeholder = NSAttributedString(string: focused ? "" : "Search", attributes: [NSAttributedString.Key.font: NSFont.systemFont(ofSize: domainFont/* - 0.5*/, weight: NSFont.Weight.thin), NSAttributedString.Key.foregroundColor: NSColor(white: 0.6, alpha: 0.9)])
        nsView.placeholderAttributedString = placeholder

        (nsView.currentEditor() as? NSTextView)?.insertionPointColor = incognito ? .white : .black


        //domain formatting
        var mainRange:NSRange
        if let url = URL(string: input), let host = url.host, !focused {
            mainRange = (input as NSString).range(of: host)
        } else {
            mainRange = NSRange(location: 0, length: input.count)
        }

        let mutableAttributedString = NSMutableAttributedString.init(string: input)
        mutableAttributedString.addAttribute(NSAttributedString.Key.foregroundColor, value: incognito ? NSColor(white: 0.5, alpha: 1) : NSColor(white: 0.7, alpha: 1), range: NSRange(location: 0, length: input.count))
        mutableAttributedString.addAttribute(NSAttributedString.Key.foregroundColor, value: incognito ? NSColor.white : NSColor.black, range: mainRange)
                        

//        if let editor = nsView.currentEditor() as? NSTextView, editor.selectedRange.length > 0 {
//            let index = editor.selectedRange.lowerBound
//            let range = NSRange(location: 0, length: input.count)
//
//            editor.scrollRangeToVisible(range)
//        }
//
//        nsView.usesSingleLineMode = !focused
//        nsView.maximumNumberOfLines = focused ? 30 : 1
//
//        nsView.cell?.isScrollable = false
        nsView.attributedStringValue = mutableAttributedString
//        nsView.cell?.isScrollable = true
    }
    
    
    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }
    
    
    class Coordinator: NSObject, NSTextFieldDelegate {
        var parent:SearchBar
        
//        private var last = ""
        private var noCompletion = false
        private var deleteAll = false
        
        init(parent: SearchBar) {
            self.parent = parent
        }
        
        func controlTextDidChange(_ obj: Notification) {
            if let textField = obj.object as? NSTextField, let currentEditor = textField.currentEditor() as? NSTextView {
                let input = textField.stringValue
                let completion = parent.onChange(input)

                if deleteAll {
                    textField.stringValue = ""
                } else if let comp = completion, comp.count > 0, let pos = currentEditor.selectedRanges.first?.rangeValue.location, pos == input.count, !noCompletion {
                    textField.stringValue = input + comp
                    currentEditor.setSelectedRange(NSRange(location: input.count, length: comp.count))
                    if let i = parent.navState.selectedWebIndex {
                        parent.navState.webViews[i].domain = input + comp
                    }
                } else {
                    if let i = parent.navState.selectedWebIndex {
                        parent.navState.webViews[i].domain = input
                    }
                }
                
//                last = input
                noCompletion = false
                deleteAll = false
            }
        }
        
        
        func control(_ control: NSControl, textView: NSTextView, doCommandBy commandSelector: Selector) -> Bool {
            if (commandSelector == #selector(NSResponder.insertNewline(_:))) {
                parent.onSubmit(textView.string)
                return true
            } else if (commandSelector == #selector(NSResponder.deleteForward(_:))) {
                noCompletion = true
            } else if (commandSelector == #selector(NSResponder.deleteBackward(_:))) {
                noCompletion = true
            }
            
            if let event = NSApp.currentEvent, event.keyCode == 51 {
                noCompletion = true
            }
            return false
        }
    }
}
//
//class MyTextField: NSTextField {
////    public override var intrinsicContentSize: NSSize {
//////          let fictionalBounds = NSRect(x: bounds.minX, y: bounds.minY, width: bounds.width, height: CGFloat.greatestFiniteMagnitude)
//////          return cell!.cellSize(forBounds: fictionalBounds)
////       var size = super.intrinsicContentSize
////
////        size.width = max(bounds.size.width, size.width)
////       return size
////
////    }
////
////   public override func textDidChange(_ notification: Notification) {
////      super.textDidChange(notification)
////
////       validateEditing()
////       invalidateIntrinsicContentSize()
////    }
//
//}
//
//
////
////class MyCell: NSTextFieldCell {
////    var editor: NSTextView?
////
////
////    override var isScrollable: Bool {
////        get {
////
////            if let selectedRange = editor?.selectedRange {
////                print("did unrwapp optionalws")
////                if selectedRange.length > 0 {
////                    print("did return false")
////                    return false
////                } else {
////                    return true
////                }
////
////            }
////            return super.isScrollable
////        } set {
////            super.isScrollable = newValue
////        }
////    }
////
////}
