// Herramienta de imágenes para preparar los assets del sitio (macOS, sin dependencias externas).
// Uso:
//   imgtool frame <video> <segundos> <salida.png>        Extrae un fotograma exacto.
//   imgtool bbox <imagen> <y0> <y1>                       Caja de píxeles visibles (alfa > 16) entre filas y0..y1.
//   imgtool crop <imagen> <x> <y> <w> <h> <salida.png>    Recorta sin escalar ni recolorear.
//   imgtool fit <imagen> <ancho> <salida.png>             Escala proporcionalmente al ancho indicado.
//   imgtool og <emblema.png> <marca> <lema> <productos> <salida.jpg>   Compone la imagen social 1200x630.
import AVFoundation
import AppKit

func fail(_ msg: String) -> Never { FileHandle.standardError.write((msg + "\n").data(using: .utf8)!); exit(1) }

func loadCG(_ path: String) -> CGImage {
    guard let img = NSImage(contentsOfFile: path),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { fail("No se pudo abrir \(path)") }
    return cg
}

func writePNG(_ cg: CGImage, _ path: String) {
    let rep = NSBitmapImageRep(cgImage: cg)
    guard let data = rep.representation(using: .png, properties: [:]) else { fail("No se pudo codificar PNG") }
    try! data.write(to: URL(fileURLWithPath: path))
    print("ok \(path) \(cg.width)x\(cg.height)")
}

func rgbaContext(_ w: Int, _ h: Int) -> CGContext {
    CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
              space: CGColorSpace(name: CGColorSpace.sRGB)!,
              bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
}

let a = CommandLine.arguments
guard a.count >= 2 else { fail("Falta el subcomando") }

switch a[1] {
case "frame":
    let asset = AVURLAsset(url: URL(fileURLWithPath: a[2]))
    let gen = AVAssetImageGenerator(asset: asset)
    gen.appliesPreferredTrackTransform = true
    gen.requestedTimeToleranceBefore = .zero
    gen.requestedTimeToleranceAfter = .zero
    let cg = try! gen.copyCGImage(at: CMTime(seconds: Double(a[3])!, preferredTimescale: 600), actualTime: nil)
    writePNG(cg, a[4])

case "bbox":
    let cg = loadCG(a[2]); let w = cg.width, h = cg.height
    let ctx = rgbaContext(w, h)
    ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
    let px = ctx.data!.bindMemory(to: UInt8.self, capacity: w * h * 4)
    let y0 = Int(a[3])!, y1 = min(Int(a[4])!, h - 1)
    var minX = w, maxX = -1, minY = h, maxY = -1
    for y in y0...y1 {
        // La memoria del contexto de mapa de bits va de arriba hacia abajo, igual que la imagen.
        let row = y * w * 4
        for x in 0..<w where px[row + x * 4 + 3] > 16 {
            minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y)
        }
    }
    print("bbox x=\(minX) y=\(minY) w=\(maxX - minX + 1) h=\(maxY - minY + 1) (imagen \(w)x\(h))")

case "crop":
    let cg = loadCG(a[2])
    let r = CGRect(x: Int(a[3])!, y: Int(a[4])!, width: Int(a[5])!, height: Int(a[6])!)
    guard let out = cg.cropping(to: r) else { fail("Recorte inválido") }
    writePNG(out, a[7])

case "fit":
    let cg = loadCG(a[2]); let tw = Int(a[3])!
    let th = Int((Double(cg.height) * Double(tw) / Double(cg.width)).rounded())
    let ctx = rgbaContext(tw, th)
    ctx.interpolationQuality = .high
    ctx.draw(cg, in: CGRect(x: 0, y: 0, width: tw, height: th))
    writePNG(ctx.makeImage()!, a[4])

case "og":
    // Fondo y retícula del sitio, emblema a la izquierda, marca y lema a la derecha.
    let W = 1200, H = 630
    let ctx = rgbaContext(W, H)
    ctx.setFillColor(CGColor(srgbRed: 11/255, green: 17/255, blue: 32/255, alpha: 1))
    ctx.fill(CGRect(x: 0, y: 0, width: W, height: H))
    ctx.setStrokeColor(CGColor(srgbRed: 199/255, green: 167/255, blue: 74/255, alpha: 0.07))
    ctx.setLineWidth(1)
    for x in stride(from: 0, through: W, by: 40) { ctx.move(to: CGPoint(x: x, y: 0)); ctx.addLine(to: CGPoint(x: x, y: H)) }
    for y in stride(from: 0, through: H, by: 40) { ctx.move(to: CGPoint(x: 0, y: y)); ctx.addLine(to: CGPoint(x: W, y: y)) }
    ctx.strokePath()
    // Resplandor dorado suave detrás del emblema.
    let glow = CGGradient(colorsSpace: CGColorSpace(name: CGColorSpace.sRGB)!,
                          colors: [CGColor(srgbRed: 199/255, green: 167/255, blue: 74/255, alpha: 0.22),
                                   CGColor(srgbRed: 199/255, green: 167/255, blue: 74/255, alpha: 0)] as CFArray,
                          locations: [0, 1])!
    ctx.drawRadialGradient(glow, startCenter: CGPoint(x: 290, y: 315), startRadius: 0,
                           endCenter: CGPoint(x: 290, y: 315), endRadius: 300, options: [])
    let emblem = loadCG(a[2])
    let es = 330.0, ew = es * Double(emblem.width) / Double(emblem.height)
    ctx.interpolationQuality = .high
    ctx.draw(emblem, in: CGRect(x: 290 - ew / 2, y: 315 - es / 2, width: ew, height: es))

    let ns = NSGraphicsContext(cgContext: ctx, flipped: false)
    NSGraphicsContext.saveGraphicsState(); NSGraphicsContext.current = ns
    func draw(_ text: String, _ font: NSFont, _ color: NSColor, _ x: CGFloat, _ y: CGFloat, kern: CGFloat = 0) {
        NSAttributedString(string: text, attributes: [.font: font, .foregroundColor: color, .kern: kern])
            .draw(at: NSPoint(x: x, y: y))
    }
    let gold = NSColor(srgbRed: 199/255, green: 167/255, blue: 74/255, alpha: 1)
    draw(a[3], NSFont.systemFont(ofSize: 92, weight: .black), .white, 520, 330)
    draw(a[4], NSFont.systemFont(ofSize: 40, weight: .bold), gold, 524, 262)
    draw(a[5], NSFont.systemFont(ofSize: 27, weight: .semibold), NSColor(white: 1, alpha: 0.78), 526, 200, kern: 0.5)
    NSGraphicsContext.restoreGraphicsState()

    let rep = NSBitmapImageRep(cgImage: ctx.makeImage()!)
    let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.86])!
    try! data.write(to: URL(fileURLWithPath: a[6]))
    print("ok \(a[6]) \(W)x\(H)")

default:
    fail("Subcomando desconocido: \(a[1])")
}
