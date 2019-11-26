import { HomeFilterPipe } from "./home-filter.pipe"

describe('HomeFilterPipe', () => {
    let pipe: HomeFilterPipe;
    beforeEach(() => {
        pipe = new HomeFilterPipe();
    });
    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('should select genreInput', () => {
        expect(pipe.transform).toBeDefined;
    });
    it('should return null', () => {
        expect(pipe.transform(null)).toEqual(undefined);
    });

})