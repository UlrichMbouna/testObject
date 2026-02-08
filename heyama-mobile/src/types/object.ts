export interface ObjectItem {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt?: string;
  }
  
  export interface CreateObjectDto {
    title: string;
    description: string;
    image: {
      uri: string;
      name: string;
      type: string;
    };
  }