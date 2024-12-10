import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("chat")
export class ChatController {

    constructor(private readonly chatService : ChatService) {}

    @Post("query")
    async chat(@Body() {query,projectId} : {query : string,projectId : string}) : Promise<string> {
        return this.chatService.query(query,projectId);
    }
}