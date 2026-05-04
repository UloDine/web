interface CustomNotification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "ORDER_UPDATE" | "PROMOTION" | "GENERAL";
}
