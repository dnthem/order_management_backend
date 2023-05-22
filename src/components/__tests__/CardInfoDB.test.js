import CardInfoDB from "../CardInfoDB";
import renderer from 'react-test-renderer';

describe("CardInfoDB", () => {
    const props = {
        title: "title",
        value: "value",
        icon: "icon",
    }
        
    test("should render CardInfoDB component", () => {
        const component = renderer.create(
            <CardInfoDB {...props}/>,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});