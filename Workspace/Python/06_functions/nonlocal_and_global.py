# Video 42

def update_order():
    chai_type = 'Cardamom'
    def kitchen():
        nonlocal chai_type
        chai_type = 'Kesar'
        print(chai_type)

    kitchen()
    print(chai_type)

update_order()
