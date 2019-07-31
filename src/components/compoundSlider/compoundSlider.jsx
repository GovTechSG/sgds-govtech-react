import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./sliderComponents";

const sliderStyle = {
  position: "relative",
  width: "100%"
};

class CompoundSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  state = {
    values: this.props.buttonDefault.slice(),
    update: this.props.buttonDefault.slice()
  };

  onUpdate = update => {
    this.setState({ update });
    this.props.onUpdateButtonStyle(update);
  };

  onChange = values => {
    this.setState({ values });
    this.props.onUpdateButtonStyle(values);
  };

  render() {
    return (
      <div style={{ margin: "10%", height: 25, width: "80%" }}>
        <Slider
          mode={2}
          step={1}
          domain={this.props.buttonRange}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={this.props.buttonDefault}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={this.props.buttonRange}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default CompoundSlider;
