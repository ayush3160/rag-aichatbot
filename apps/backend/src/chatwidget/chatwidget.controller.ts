import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { join } from 'path';
import { promises as fs } from 'fs';

@Controller("chatwidget")
export class ChatWidgetController {

    @Get("widget/:projectId")
    async getWidget(@Param() { projectId }: { projectId: string }): Promise<string> {
        console.log('projectId', projectId);
        const jsScript = await fs.readFile(join(__dirname, '../../../../packages/chatbot/dist/index.js'));

        const widgetScript = `
            ${jsScript.toString()}
  
            // Initialize the widget
            window.mountJeemagent({
                projectId: '${projectId}'
            });
        `;

        return widgetScript;
    }
}