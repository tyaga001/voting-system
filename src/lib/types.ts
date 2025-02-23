export type VoteSession = {
  id: string;
  title: string;
  description: string;
  options: VoteOption[];
  createdAt: Date;
  votes: Record<string, string>; // userId -> optionId
}

export type VoteOption = {
  id: string;
  text: string;
}

export type User = {
  id: string;
  name: string;
}
