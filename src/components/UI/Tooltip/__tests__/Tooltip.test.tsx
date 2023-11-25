import { fireEvent, render } from '@testing-library/react';

import Tooltip from '../Tooltip';

describe('Tooltip Component', () => {
  const content = (
    <button>tooltip</button>
  );

  const tooltip = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta tempore quisquam dolorum, maiores facere facilis illo repellat libero atque! Ratione hic, repellendus deserunt asperiores adipisci eius.';

  it('should render', () => {
    const { getByRole, container } = render(
      <Tooltip
        tooltip={tooltip}
      >
        {content}
      </Tooltip>
    );

    const tooltipElement = getByRole('tooltip');
    const tooltipContentElement = container.querySelector('.tooltip__content');

    expect(tooltipElement).toBeInTheDocument();
    expect(tooltipContentElement).toHaveTextContent(tooltip);
  });

  it('should open on mouse enter when trigger is hover', () => {
    const { getByRole, container } = render(
      <Tooltip
        tooltip={tooltip}
        trigger="hover"
      >
        {content}
      </Tooltip>
    );

    const tooltipWrapper = container.querySelector('.tooltip-wrapper') as HTMLDivElement;
    const tooltipElement = getByRole('tooltip');

    fireEvent.mouseEnter(tooltipWrapper);

    expect(tooltipElement.className.includes('open')).toBeTruthy();
  });

  it('should close on mouse leave when trigger is hover', () => {
    const { getByRole, container } = render(
      <Tooltip
        tooltip={tooltip}
        trigger="hover"
      >
        {content}
      </Tooltip>
    );

    const tooltipWrapper = container.querySelector('.tooltip-wrapper') as HTMLDivElement;
    const tooltipElement = getByRole('tooltip');

    fireEvent.mouseEnter(tooltipWrapper);

    fireEvent.mouseLeave(tooltipWrapper);

    expect(tooltipElement.className.includes('open')).toBeFalsy();
  });

  it('should open on click when trigger is click', () => {
    const { getByRole, container } = render(
      <Tooltip
        tooltip={tooltip}
        trigger="click"
      >
        {content}
      </Tooltip>
    );

    const tooltipWrapper = container.querySelector('.tooltip-wrapper') as HTMLDivElement;
    const tooltipElement = getByRole('tooltip');

    fireEvent.click(tooltipWrapper);

    expect(tooltipElement.className.includes('open')).toBeTruthy();
  });

  it('should close on click when trigger is click', () => {
    const { getByRole, container } = render(
      <Tooltip
        tooltip={tooltip}
        trigger="click"
      >
        {content}
      </Tooltip>
    );

    const tooltipWrapper = container.querySelector('.tooltip-wrapper') as HTMLDivElement;
    const tooltipElement = getByRole('tooltip');

    fireEvent.click(tooltipWrapper);
    fireEvent.click(tooltipWrapper);

    expect(tooltipElement.className.includes('open')).toBeFalsy();
  });

  it('should close on outside click when trigger is click', () => {
    const { getByRole, container } = render(
      <Tooltip
        tooltip={tooltip}
        trigger="click"
      >
        {content}
      </Tooltip>
    );

    const tooltipWrapper = container.querySelector('.tooltip-wrapper') as HTMLDivElement;
    const tooltipElement = getByRole('tooltip');

    fireEvent.click(tooltipWrapper);

    fireEvent.click(document.body);

    expect(tooltipElement.className.includes('open')).toBeFalsy();
  });

  it('should apply className', () => {
    const { container } = render(<Tooltip tooltip={tooltip} className="some-class" />);

    const tooltipWrapper = container.querySelector('.some-class') as HTMLDivElement;

    expect(tooltipWrapper).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();

    const { container } = render(
      <Tooltip
        tooltip={tooltip}
        onClick={handleClick}
      >
        {content}
      </Tooltip>
    );

    const tooltipWrapper = container.querySelector('.tooltip-wrapper') as HTMLDivElement;

    fireEvent.click(tooltipWrapper);

    expect(handleClick).toHaveBeenCalled();
  });
});
