import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/production' })
export class ProductionGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private _logger: Logger = new Logger('ProductionGateway');
    connectedUsers: any[] = [];

    afterInit(_server: Server) {
        this._logger.log('ProductionGateway successfully started');
    }

    handleConnection(client: Socket, ..._args: any[]) {
        this._logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.connectedUsers = [
            ...this.connectedUsers.filter(item => item.id !== client.id),
        ];

        this.server.emit('users', this.connectedUsers);

        this._logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('production')
    handleProduction(client: Socket, payload: any): void {
        const connectedUser = { ...payload, id: client.id };
        const index = this.connectedUsers.findIndex(
            el => el.task.user.uuid === payload.task.user.uuid,
        );

        if (index === -1) {
            this.connectedUsers = [...this.connectedUsers, connectedUser];
        } else {
            this.connectedUsers[index] = connectedUser;
        }

        this.server.emit('users', this.connectedUsers);
    }
}
