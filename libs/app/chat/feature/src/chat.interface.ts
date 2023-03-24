export interface chat{
    id: string;
    messages: message[];
    participants: string;
    timeLeft: number;
}

export interface message{
    from: string;
    content: string;
    time: string;
}