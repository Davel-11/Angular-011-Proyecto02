import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { query } from '@angular/core/src/render3/instructions';

@Injectable()
export class CategoryService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getCategories(){
     return this.db.list('/categories', {
     query: {
       OrderByChild: 'name'
     }
    });
  }
}
