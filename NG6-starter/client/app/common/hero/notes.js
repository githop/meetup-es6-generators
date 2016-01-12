/**
 *
 * Created by githop on 1/12/16.
 */
const baseUrl = 'http://swapi.co/api/';

class HeroController {
    constructor($timeout, $http) {
        var ctrl = this;
        this.name = 'hero';
        this.startCount(this.countUp(), $timeout);
        this.simpleCo(function *() {
            let luke = yield $http.get(baseUrl + 'people/1/');
            let c3p0 = yield $http.get(baseUrl + 'people/2/');

            ctrl.simpleco = `${luke.name} and ${c3p0.name}`;
        });
    }

    *countUp(count = 0) {
        while (true) {
            this.counter = count++;
            yield;
        }
    }

    startCount(genObj, timeout) {
        if (!genObj.next().done) {
            timeout(() => this.startCount(genObj, timeout), 1000);
        }
    }

    simpleCo(genFn) {
        let genObj = genFn();

        const start = (promise) => {
            let {value, done} = genObj.next(promise);

            if (!done) {
                value
                    .then(result => start(result.data))
                    .catch(e => genObj.throw(e));
            }

        };

        return start();

    }
}


export default HeroController;