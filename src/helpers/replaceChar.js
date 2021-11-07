export default function replaceChar(char) {
    switch (char) {
        case 'backspace':
            return "backspace material-icons";

        case 'CE':
            return "fnCe";

        case '/':
            return "opDiv";

        case '*':
            return "opMult";

        case '-':
            return "opSub";

        case '+':
            return "opSum";

        case ',':
            return "opDec";

        case 0:
            return "numZero";

        case '=':
            return "fnRes";

        default:
            return 'numKey'
    }
}