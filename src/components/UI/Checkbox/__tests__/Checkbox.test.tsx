import { fireEvent, render } from '@testing-library/react';

import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
  it('should render', () => {
    const { getByRole } = render(
      <Checkbox />
    );

    const checkboxElement = getByRole('checkbox');

    expect(checkboxElement).toBeInTheDocument();
  });

  it('should apply className', () => {
    const { container } = render(<Checkbox className="some-class" />);

    const checkboxElement = container.querySelector('.some-class');

    expect(checkboxElement).toBeInTheDocument();
  });

  it('should apply disabled', () => {
    const { getByRole } = render(<Checkbox disabled />);
    const checkboxElement = getByRole('checkbox');

    expect(checkboxElement.getAttribute('disabled')).not.toBeNull();
    expect(checkboxElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should apply label', () => {
    const label = 'Checkbox label';
    const { getByRole } = render(<Checkbox label={label} />);
    const checkboxElement = getByRole('checkbox');

    expect(checkboxElement.getAttribute('aria-label')).toBe(label);
  });

  it('should apply checked', () => {
    const { getByRole } = render(<Checkbox value />);
    const checkboxElement = getByRole('checkbox');

    expect(checkboxElement.getAttribute('aria-checked')).toBe(String(true));
  });

  it('should handle change events', () => {
    const handleChange = jest.fn();

    const { getByRole } = render(<Checkbox onChange={handleChange} />);
    const checkboxElement = getByRole('checkbox');

    fireEvent.click(checkboxElement);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(<Checkbox onClick={handleClick} />);
    const checkboxElement = getByRole('checkbox');

    fireEvent.click(checkboxElement);

    expect(handleClick).toHaveBeenCalled();
  });
});
