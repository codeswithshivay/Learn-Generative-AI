flavours = ['Ginger', 'Lemon', 'Out Of Stock', 'Discontinued', 'Tulsi']

for flavour in flavours:
    if(flavour == 'Out Of Stock'): continue
    elif (flavour == 'Discontinued'): break
    else: print(flavour)