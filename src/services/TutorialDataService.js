import {
  ref, child, push, update, remove,
} from 'firebase/database';
import firebase from '../firebase';

const db = ref(firebase, 'tutorials');
class TutorialDataService {
  static getAll() {
    return db;
  }

  static create(tutorial) {
    return push(db, tutorial);
  }

  static update(key, value) {
    return update(child(db, key), value);
  }

  static delete(key) {
    return remove(child(db, key));
  }

  static deleteAll() {
    return remove(db);
  }
}
export default TutorialDataService;
