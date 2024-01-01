import {
    Controller,
    Get,
    Req,
    HttpCode,
    Res,
    HttpStatus,
    Header,
    Redirect,
    Param,
    Query,
    Headers,
    Post,
    Body,
    Patch,
    Delete,
    Inject,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { Request, Response } from 'express';
import { CreateUSerDTO } from '../dto/create-user-dto';
import { UserStore } from '../../store/user.store';
import { UserServices } from '../services/user-services';


@Controller('/user')
export class UserController {
    constructor(
        private userSevices: UserServices
    ) {
        console.log(this.userSevices)
    }

    @Post()
    addUser(@Res() res: Response, @Body() body: CreateUSerDTO) {
        this.userSevices.addUser(body);
        return res.json({
            message: 'Object added successfully',
            code: HttpStatus.OK,
        });
    }

    @Get()
    getusers(@Res() res: Response) {
        return res.json({
            message: 'All users',
            user: this.userSevices.getAllUser(),
            code: HttpStatus.OK,
        });
    }

    @Get(':id')
    getUserById(@Param('id') id: number, @Res() res: Response) {
        const singleUser = this.userSevices.getUserById(+id);
        console.log('Id => ', id, singleUser);
        if (singleUser) {
            return res.json({
                message: 'User found',
                user: singleUser,
                code: HttpStatus.OK,
            });
        } else {
            return res.json({
                message: 'User not found',
                code: HttpStatus.NOT_FOUND,
            });
        }
    }

    @Patch(':id')
    udpateUserById(
        @Res() res: Response,
        @Param('id') id: number,
        @Body() body: CreateUSerDTO,
    ) {
        const userIndex = this.userSevices.getUserById(+id);

        console.log('id => ', id, userIndex);

        if (!userIndex) {
            return res.json({
                message: 'User not found',
                code: HttpStatus.NOT_FOUND,
            });
        }

        this.userSevices.updateUser(+id, body)

        return res.json({
            message: 'User Updated successfull',
            code: HttpStatus.OK,
        });
    }

    @Delete(':id')
    DeleteUserById(@Res() res: Response, @Param('id') id: number) {
        const userIndex = this.userSevices.getUserById(+id);

        if (!userIndex) {
            return res.json({
                message: 'User not found',
                code: HttpStatus.NOT_FOUND,
            });
        }

        this.userSevices.deleteUser(+id);

        return res.json({
            message: 'User delete successfull',
            code: HttpStatus.OK,
        });
    }
}
