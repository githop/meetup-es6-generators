const baseUrl = 'http://swapi.co/api/';

class HeroController {
    constructor($timeout, $http) {
        var ctrl = this;
        this.name = 'hero';
        this.startCounter(this.countUp(), $timeout);
        this.simpleCo(function *() {
            let luke = yield $http.get(baseUrl + 'people/1/');
            let c3p0 = yield $http.get(baseUrl + 'people/2/');

            ctrl.results = `${luke.name} and ${c3p0.name}`;
        });
    }

    *countUp(count = 0) {
        while (true) {
            this.counter = count++;
            yield;
        }
    }

    startCounter(genFn, timer) {
        if (!genFn.next().done) {
            timer(() => this.startCounter(genFn, timer), 1000);
        }
    }

    simpleCo(genFn) {
        let genObj = genFn();

        const start = (promise = undefined) => {
            let {value, done} = genObj.next(promise);
            if (!done) {
                value
                .then((result) => start(result.data))
                .catch((e) => genObj.throw(e));
            }
        };

        return start();
    }

}

export default HeroController;