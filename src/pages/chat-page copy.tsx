import React, { use, useEffect, useState } from "react";
import { useParams, Params } from "react-router-dom";
import { Dots } from "react-activity";
import { BiSolidSend } from "react-icons/bi";

interface Message {
    role: string;
    content: string;
    timestamp: string | null;
}

interface Response{
    chatId: string;
    title: string;
    messages: Message[];
    metadata: any;
}

type InputProps = {
    message: string;
    setMessage: (message: string) => void;
}

const InputField = ({message, setMessage}: InputProps) => {
    return (
        <textarea
            placeholder="Type a message"
            className="inputField"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
    );
}

const Input = ({ chatId }: { chatId: string }) => {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState<string | null>(null);
    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const item: Message={
            role: "user",
            content: message,
            timestamp: null,
        };
    
        try {
          const response = await fetch(`http://localhost:8000/send-chat/${chatId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
    
          if (!response.ok) {
            throw new Error("Failed to create item");
          }
    
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="input">
            <InputField message="message" setMessage={setMessage}/>
            <button className="sendButton" onClick={handleSend}><BiSolidSend /></button>
        </div>
    );
}

const Dialogs = ({ chatId }: { chatId: string }) => {
    const [loading, setLoading] = useState(true);
    const [dialogs, setDialogs] = useState<Response>();

    useEffect(() => {
        fetch(`http://192.168.11.79:8000/get-chat/${chatId}`)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                setDialogs(data);
            }

            )
    }, [dialogs]);

    console.log(dialogs);

    if (loading) return <Dots />;
    return (
        <div className="dialogs">
            {dialogs?.messages.map((message, index) => (
                <div key={index} className={`dialog ${message.role}`}>
                    {message.content}
                </div>
            ))
            }
        </div>
    );
}

const Chat = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [chat, setChat] = useState([]);


    return (
        <div className="chatbot">
            {params.chatId && <Dialogs chatId={params.chatId} />}
            {params.chatId && <Input chatId={params.chatId} />}
        </div>
    );
}

export default Chat;
