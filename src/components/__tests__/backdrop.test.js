import Backdrop from "../Backdrop";
import renderer from 'react-test-renderer';


describe("Backdrop", () => {

    
    test("should render Backdrop component", () => {
        const component = renderer.create(
            <Backdrop />,
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();

          
    });
});
