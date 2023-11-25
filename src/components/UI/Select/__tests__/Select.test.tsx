import { fireEvent, render } from '@testing-library/react';

import Select from '../Select';
import Switch from '../../Switch';

describe('Select Component', () => {
  const placeholder = 'Select';
  const id = 'select';
  const options = [{ key: 'option1', label: 'Option 1' }, { key: 'option2', label: 'Option 2', disabled: true }, { key: 'option3', label: 'Option 3' }, { key: 'option4', label: 'Option 4' }, { key: 'option5', label: 'Option 5' }];

  it('should render', () => {
    const { getByRole } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
      />
    );

    const selectElement = getByRole('combobox');
    const selectPopupElement = getByRole('listbox');

    expect(selectElement).toBeInTheDocument();
    expect(selectPopupElement).toBeInTheDocument();
  });

  it('should apply disabled', () => {
    const { getByRole } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
        disabled
      />
    );

    const selectElement = getByRole('combobox');

    expect(selectElement.getAttribute('disabled')).not.toBeNull();
    expect(selectElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should apply placeholder', () => {
    const { container } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
      />
    );

    const placeholderLabelElement = container.querySelector(`#${id}-label`);
    const placeholderElement = container.querySelector('.select__button-placeholder');

    expect(placeholderLabelElement).toHaveTextContent(placeholder);
    expect(placeholderElement).toHaveTextContent(placeholder);
  });

  it('should apply value', () => {
    const { container } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
        value={options[0].key}
      />
    );

    const valueElement = container.querySelector('.select__button-placeholder');
    const selectedOptionElement = container.querySelector('[aria-selected="true"]');

    expect(valueElement).toHaveTextContent(options[0].label);
    expect(selectedOptionElement).toHaveTextContent(options[0].label);
  });

  it('should handle change events', () => {
    const handleChange = jest.fn();

    const { getAllByRole } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
      />
    );

    const optionElement = getAllByRole('option')[0];

    fireEvent.click(optionElement);

    expect(handleChange).toHaveBeenCalledWith(options[0].key);
  });

  it('should render empty', () => {
    const { container } = render(
      <Select
        id={id}
        options={[]}
        placeholder={placeholder}
      />
    );

    const emptyElement = container.querySelector('.select__popup-empty');

    expect(emptyElement).toBeInTheDocument();
  });

  it('should toggle popup on select click', () => {
    const { getByRole } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
      />
    );

    const selectElement = getByRole('combobox');

    expect(selectElement.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(selectElement);

    expect(selectElement.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(selectElement);

    expect(selectElement.getAttribute('aria-expanded')).toBe('false');
  });

  it('should close popup on click outside', () => {
    const { getByRole } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
      />
    );

    const selectElement = getByRole('combobox');

    fireEvent.click(selectElement);

    expect(selectElement.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(document.body);

    expect(selectElement.getAttribute('aria-expanded')).toBe('false');
  });

  it('should render options', () => {
    const { getAllByRole } = render(
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
      />
    );

    const optionElements = getAllByRole('option');

    options.forEach((option, index) => {
      const optionElement = optionElements[index];

      expect(optionElement).toHaveTextContent(option.label);
    });
  });
});
