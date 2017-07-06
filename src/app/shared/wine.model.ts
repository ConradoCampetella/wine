export class Wine {
    public name: string;
    public variety: string;
    public img: string;
    public description: string;
    public price: number;

    constructor(name: string, variety: string, img: string, description: string, price: number) {
        this.name = name;
        this.variety = variety;
        this.img = img;
        this.price = price;
        this.description = description;
    }
}
