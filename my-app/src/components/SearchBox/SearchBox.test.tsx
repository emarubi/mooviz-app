import { fireEvent, render, screen } from '@testing-library/react'
import SearchBox from './index'

describe("<SearchBox />", () => {

  describe("when rendered with a `submitSearch` prop", () => {
    it("should paste it into the input", () => {
      const setSearchValueMock = jest.fn();
      const submitSearchMock = jest.fn();
      render(
        <SearchBox 
          searchValue="Hello" 
          setSearchValue={setSearchValueMock}
          submitSearch={submitSearchMock}
        />
      ); 

      expect(screen.getByRole('textbox')).toHaveValue("Hello")

    });
  });

  describe("when the button is pressed", () => {
    it("should call the `submitSearch` callback", () => {
      const setSearchValueMock = jest.fn();
      const submitSearchMock = jest.fn();
      render(
        <SearchBox 
          searchValue="Test Name" 
          setSearchValue={setSearchValueMock}
          submitSearch={submitSearchMock}
        />
      );

      fireEvent.click(screen.getByRole("button"));
      expect(submitSearchMock).toHaveBeenCalled();
    });
  });
});