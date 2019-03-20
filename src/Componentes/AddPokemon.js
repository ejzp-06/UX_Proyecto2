import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper, TextField } from '@material-ui/core';
import './AddPokemon.css';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['The basics.', 'A little important information.', 'Final step'];
}


class HorizontalLinearStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      url: '',
      type: '',
      height: '',
      weight: '',
      gender: '',
      catchRate: '',
      activeStep: 0,
      skipped: new Set(),
    }
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleUrlChange = (e) => {
    this.setState({
      url: e.target.value
    })
  }

  handleTypeChange = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  handleHeightChange = (e) => {
    this.setState({
      height: e.target.value
    })
  }

  handleWeightChange = (e) => {
    this.setState({
      weight: e.target.value
    })
  }

  handleGenderChange = (e) => {
    this.setState({
      gender: e.target.value
    })
  }

  handleCacthRateChange = (e) => {
    this.setState({
      catchRate: e.target.value
    })
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Paper style={{ height: 400, color: "black" }}>
            <br />
            <h1>The Basics</h1>
            <TextField value={this.state.name} label="Name" onChange={this.handleNameChange} />
            <br />
            <TextField value={this.state.url} label="Image URL" onChange={this.handleUrlChange} />
            <br />
            <TextField value={this.state.type} label="Type" onChange={this.handleTypeChange} />
          </Paper>
        );
      case 1:
        return (
          <Paper style={{ height: 400, color: "black" }}>
            <br />
            <h1>A little important information</h1>
            <TextField value={this.state.height} label="Height" onChange={this.handleHeightChange} />
            <br />
            <TextField value={this.state.weight} label="Weight" onChange={this.handleWeightChange} />
            <br />
            <TextField value={this.state.gender} label="Gender" onChange={this.handleGenderChange} />
            <br />
            <TextField value={this.state.catchRate} label="Catch Rate" onChange={this.handleCacthRateChange} />
            <br />
          </Paper>
        );
      case 2:
        return (
          <Paper style={{ color: "black" }}>
            <br />
            <h1>Resume</h1>
            <div>{<img src={this.state.url}></img>}</div>
            <br />
            <div>{this.state.name}</div>
            <br />
            <div>{this.state.type}</div>
            <br />
            <div>{this.state.catchRate}</div>
          </Paper>
        );
      default:
        return 'Unknown step';
    }
  }

  isStepOptional = step => step === 1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className={classes.root}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const props = {};
                const labelProps = {};
                if (this.isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
                if (this.isStepSkipped(index)) {
                  props.completed = false;
                }
                return (
                  <Step key={label} {...props}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
              </Typography>
                  <Button onClick={this.handleReset} className={classes.button}>
                    Reset
              </Button>
                </div>
              ) : (
                  <div>
                    <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                </Button>
                      {this.isStepOptional(activeStep) && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleSkip}
                          className={classes.button}
                        >
                          Skip
                  </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </header>
      </div>


    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HorizontalLinearStepper);