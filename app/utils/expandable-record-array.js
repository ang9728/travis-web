import { Promise as EmberPromise } from 'rsvp';
import ArrayProxy from '@ember/array/proxy';
import { computed } from '@ember/object';
import { asObservableArray } from "travis/utils/observable_array";

export default ArrayProxy.extend({
  isLoaded: false,
  isLoading: false,

  promise: computed(function () {
    return new EmberPromise((resolve) => {
      let observer = () => {
        if (this.isLoaded) {
          resolve(this);
          this.removeObserver('isLoaded', observer);
          return true;
        }
      };
      if (!observer()) {
        return this.addObserver('isLoaded', observer);
      }
    });
  }),

  load(array) {
    this.set('isLoading', true);
    return array.then(() => {
      array.forEach((record) => {
        if (!this.includes(record)) {
          return this.pushObject(record);
        }
      });
      this.set('isLoading', false);
      return this.set('isLoaded', true);
    });
  },

  observe(collection) {
    return asObservableArray(collection).addArrayObserver(this, {
      willChange: 'observedArrayWillChange',
      didChange: 'observedArraydidChange'
    });
  },

  observedArrayWillChange(array, index, removedCount) {
    let i, len, object, removedObjects, results;
    removedObjects = array.slice(index, index + removedCount);
    results = [];
    for (i = 0, len = removedObjects.length; i < len; i++) {
      object = removedObjects[i];
      results.push(this.removeObject(object));
    }
    return results;
  },

  observedArraydidChange(array, index, removedCount, addedCount) {
    let addedObjects, i, len, object, results;
    addedObjects = array.slice(index, index + addedCount);
    results = [];
    for (i = 0, len = addedObjects.length; i < len; i++) {
      object = addedObjects[i];
      // TODO: I'm not sure why deleted objects get here, but I'll just filter them
      // for now
      if (!object.get('isDeleted')) {
        if (!this.includes(object)) {
          results.push(this.pushObject(object));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  },

  pushObject(record) {
    let content = this.content;
    if (content) {
      if (!content.includes(record)) {
        return content.pushObject(record);
      }
    }
  }
});
