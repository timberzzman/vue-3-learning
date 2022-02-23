import {
  ref, child, push, update, remove, onValue,
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

  static tutorialsListener(callback) {
    onValue(TutorialDataService.getAll(), (snapshot) => {
      const tutorials = [];
      snapshot.forEach((item) => {
        const { key } = item;
        const data = item.val();
        tutorials.push({
          key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });
      callback(tutorials);
    });
  }
}
export default TutorialDataService;
