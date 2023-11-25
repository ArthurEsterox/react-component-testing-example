import { fireEvent, render } from '@testing-library/react';

import Option from '../Option';

import { IOption } from '../../Select/types';

describe('Option Component', () => {
  const option: IOption = {
    key: 'key',
    label: 'Option',
    disabled: false,
  };
  const selected = false;

  it('should render', () => {
    const { getByRole } = render(
      <Option
        option={option}
        selected={selected}
      />
    );

    const optionElement = getByRole('option');

    expect(optionElement).toHaveTextContent(option.label);
  });

  it('should apply disabled', () => {
    const { getByRole } = render(
      <Option
        option={{
          ...option,
          disabled: true,
        }}
        selected={selected}
      />
    );

    const optionElement = getByRole('option');

    expect(optionElement.getAttribute('disabled')).not.toBeNull();
    expect(optionElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should apply selected', () => {
    const { getByRole } = render(
      <Option
        option={option}
        selected
      />
    );

    const optionElement = getByRole('option');

    expect(optionElement.getAttribute('aria-selected')).toBe('true');
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(
      <Option
        option={option}
        selected={selected}
        onClick={handleClick}
      />
    );

    const optionElement = getByRole('option');

    fireEvent.click(optionElement);

    expect(handleClick).toHaveBeenCalledWith(option.key);
  });
});
