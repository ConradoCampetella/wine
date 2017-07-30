export class Wine {
    public wineId: string;
    public name: string;
    public variety: string;
    public img: string;
    public description: string;
    public price: number;
    public stock: number;

    constructor(wineId: string, name: string, variety: string, img: string, description: string, price: number, stock: number) {
        this.name = name;
        this.variety = variety;
        this.img = img;
        this.price = price;
        this.description = description;
        this.wineId = wineId;
        this.stock = stock;
    }
}
