import { render, fireEvent } from '@testing-library/react';

import Button from '../Button';

describe('Button Component', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Button>Hello World</Button>
    );

    const buttonElement = getByText('Hello World');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should apply className', () => {
    const { container } = render(<Button className="some-class">Hello World</Button>);
    const buttonElement = container.querySelector('.some-class');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Hello World</Button>);
    const buttonElement = getByRole('button');

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalled();
  });

  it('should apply tabIndex', () => {
    const tabIndex = -1;

    const { getByRole } = render(<Button tabIndex={tabIndex}>Hello World</Button>);
    const buttonElement = getByRole('button');

    expect(buttonElement.getAttribute('tabindex')).toBe(tabIndex.toString());
  });

  it('should apply disabled', () => {
    const { getByRole } = render(<Button disabled>Hello World</Button>);
    const buttonElement = getByRole('button');

    expect(buttonElement.getAttribute('disabled')).not.toBeNull();
    expect(buttonElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should render loader', () => {
    const { getByRole, container } = render(<Button loading>Hello World</Button>);
    const buttonElement = getByRole('button');
    const loader = container.querySelector('.button__loader');

    expect(buttonElement.getAttribute('disabled')).not.toBeNull();
    expect(buttonElement.getAttribute('tabindex')).toBe('-1');
    expect(buttonElement.className.includes('button--loading')).toBeTruthy();
    expect(loader).toBeInTheDocument();
  });
});
