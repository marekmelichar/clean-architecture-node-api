import {ICustomersController} from '../../boundary'
import { Request, Response, NextFunction } from 'express';
import * as joi from 'joi';
import { BAD_REQUEST, OK } from 'http-codes';
// import { IGetCustomers } from '../../../application';

export class CustomersController implements ICustomersController {
  // private useCases: IGetCustomers;

  // constructor(useCases: IGetCustomers) {
  //   this.useCases = useCases;
  // }

  public all = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(OK).json({ all: 'OK' });      
    } catch (e) {
      next(e)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(OK).json({ create: 'OK' });      
    } catch (e) {
      next(e)
    }
  }

  public edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(OK).json({ edit: 'OK' });      
    } catch (e) {
      next(e)
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(OK).json({ delete: 'OK' });      
    } catch (e) {
      next(e)
    }
  }
}