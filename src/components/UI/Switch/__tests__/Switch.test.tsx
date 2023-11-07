import { fireEvent, render } from '@testing-library/react';

import Switch from '../Switch';

describe('Switch Component', () => {
  it('should render', () => {
    const { getByRole } = render(
      <Switch />
    );

    const switchElement = getByRole('switch');

    expect(switchElement).toBeInTheDocument();
  });

  it('should apply className', () => {
    const { container } = render(<Switch className="some-class" />);

    const switchElement = container.querySelector('.some-class');

    expect(switchElement).toBeInTheDocument();
  });

  it('should apply disabled', () => {
    const { getByRole } = render(<Switch disabled />);
    const switchElement = getByRole('switch');

    expect(switchElement.getAttribute('disabled')).not.toBeNull();
    expect(switchElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should apply label', () => {
    const label = 'Checkbox label';
    const { getByRole } = render(<Switch label={label} />);
    const switchElement = getByRole('switch');

    expect(switchElement.getAttribute('aria-label')).toBe(label);
  });

  it('should apply checked', () => {
    const { getByRole } = render(<Switch value />);
    const switchElement = getByRole('switch');

    expect(switchElement.getAttribute('aria-checked')).toBe(String(true));
  });

  it('should handle change events', () => {
    const handleChange = jest.fn();

    const { getByRole } = render(<Switch onChange={handleChange} />);
    const switchElement = getByRole('switch');

    fireEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(<Switch onClick={handleClick} />);
    const switchElement = getByRole('switch');

    fireEvent.click(switchElement);

    expect(handleClick).toHaveBeenCalled();
  });
});
