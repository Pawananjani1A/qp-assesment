export class OrderGrcoeryDto {
    public userId: number;
    public groceryItems: Order[]

}

export class Order {
    public groceryId: number;
    public count: number;
}