export default class InputFieldModel {

    constructor(
        public nam: string,
        public value: string,
        public validateStatus: string,
        public errorMsg: string,
        public validationCount: number
    ) {
    }
}
