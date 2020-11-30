import { Router } from 'express'

interface api {
  route: String;
  use: Router;
}

export = [api];