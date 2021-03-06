export class WinesList {
    public label: string;
    public wineId: string;
    public name: string;
    public variety: string;
    public img: string;
    public description: string;
    public price: number;
    public cost: number;
    public stock: number;

    constructor(label: string,
        wineId: string,
        name: string,
        variety: string,
        img: string,
        description: string,
        price: number,
        cost: number,
        stock: number) {
        this.label = label;
        this.name = name;
        this.variety = variety;
        this.img = img;
        this.price = price;
        this.cost = cost;
        this.description = description;
        this.wineId = wineId;
        this.stock = stock;
    }
}
