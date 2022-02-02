from PIL import Image
import numpy as np
emptySlots = 0
emptySlotID = []
for i in range(0, 16):
    for j in range(0, 16):
        fileName = "glyph_" + hex(i)[2].upper() + hex(j)[2].upper() + ".png"
        try:
            im = np.array(Image.open(fileName))
            for k in range(16):
                for l in range(16):
                    isGlyphSlotEmpty = True
                    for m in range(16):
                        for n in range(16):
                            if type(im[k*16 + m,l*16 + n])=='tuple':
                                if im[k*16 + m,l*16 + n]!=(0,0,0,0):
                                    #print(im[k*16 + m,l*16 + n])
                                    isGlyphSlotEmpty = False
                                    break
                            else:
                                if im[k*16 + m,l*16 + n]!=0:
                                    #print(im[k*16 + m,l*16 + n])
                                    isGlyphSlotEmpty = False
                                    break
                        if isGlyphSlotEmpty==False:
                            break
                    if isGlyphSlotEmpty==True:
                        emptySlots += 1
                        emptySlotID.append("0x" + hex(i)[2].upper() + hex(j)[2].upper() + hex(k)[2].upper() + hex(l)[2].upper())
        except:
            print(fileName + "does not exist")
print(emptySlots)
print(emptySlotID)
