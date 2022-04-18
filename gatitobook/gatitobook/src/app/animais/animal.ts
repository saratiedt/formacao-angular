export interface Animal {
  id: number;
  postDate: Date;
  url: string;
  description: string;
  allowComents: boolean;
  likes: number;
  coments: number;
  userId: number;
}

export type Animais = Array<Animal>;
