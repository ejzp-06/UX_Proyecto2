import React, { Component } from 'react'
import {
    Dialog,
    TextField,
    Button,
    Paper,
    GridList,
    GridListTile,
    GridListTileBar,
    Stepper,
    Step,
    StepLabel,
    Typography,
    AppBar,
    Toolbar
}
    from '@material-ui/core'

import { withRouter } from 'react-router-dom'


function getSteps() {
    return ['The basics.', 'A little important information.', 'Final step'];
}


class PokeList extends Component {

    constructor(props) {
        super(props);
        this.listPokeList = this.listPokeList.bind(this);
        this.pushPokemon = this.pushPokemon.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            PokeList: [{ name: 'Bulbasaur', url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png', type: 'Plant', height: '0.7m', weight: '6.9kg', catchRate: '1', gender: 'male' },
            { name: 'Squirtle', url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png', type: 'Agua', height: '0.5m', weight: '9.0kg', catchRate: '1', gender: 'male' },
            { name: 'Caterpie', url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png', type: 'Bicho', height: '0.3,', weight: '2.9kg', catchRate: '1', gender: 'male' },
            { name: 'Weedle', url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/013.png', type: 'Bicho', height: '0.3,', weight: '3.2kg', catchRate: '1', gender: 'male' },
            { name: 'Charmander', url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', type: 'Fuego', height: '0.6m', weight: '8.5kg', catchRate: '1', gender: 'male' }],

            Name: '',
            Url: '',
            Type: '',
            Height: '',
            Weight: '',
            Gender: '',
            CatchRate: '',
            Open: false,
            activeStep: 0,
            skipped: new Set(),
        };
    }

    render() {

        const steps = getSteps();
        const { activeStep } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <div className="root">
                        <h1><img src={'https://www.pnn.space/uploads/1/3/2/9/13291422/editor/screen-shot-2018-11-18-at-8-57-47-am.png?1542550581'} style={{ width: 400 }} /></h1>
                        <Paper style={{ height: 500, width: 400 }}>
                            <GridList cellHeight={330} className="gridList" style={{ height: 500, width: 400 }}>
                                <ul>{this.state.PokeList.map(this.listPokeList)}</ul>
                            </GridList>
                        </Paper>
                        <button onClick={this.hadleOpen}>ADD NEW POKEMON!</button>

                        <Dialog fullScreen open={this.state.open} style={{ position: 'absolute', height: 700, width: 1600 }}>
                            <AppBar style={{ position: 'relative' }}>
                                <Toolbar>
                                    <Button color="inherit" onClick={this.handleClose}>
                                        Close
                                     </Button>
                                </Toolbar>
                            </AppBar>
                            <div>
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
                                    {this.state.activeStep === steps.length ? (
                                        <div>
                                            <Typography>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Button onClick={this.pushPokemon}>
                                                Save Pokemon
                                           </Button>
                                        </div>
                                    ) : (
                                            <div>
                                                <Typography >{this.getStepContent(this.state.activeStep)}</Typography>
                                                <div>
                                                    <Button
                                                        disabled={this.state.activeStep === 0}
                                                        onClick={this.handleBack}
                                                    >
                                                        Back
                                                    </Button>
                                                    {this.isStepOptional(this.state.activeStep) && (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleSkip}
                                                        >
                                                            Skip
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.handleNext}
                                                    >
                                                        {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </Dialog>

                    </div>
                </header>
            </div>
        )
    }

    pushPokemon=()=>{
        const newPokemon = {
            name: this.state.Name,
            url: this.state.Url,
            type: this.state.Type,
            height: this.state.Height,
            weight: this.state.Weight,
            gender: this.state.Gender,
            catchRate: this.state.CatchRate            
        };
        const currentPokemon = this.state.PokeList;
        currentPokemon.push(newPokemon);
        this.setState({
            PokeList: currentPokemon,
            Name: '',
            Url: '',
            Type: '',
            Height: '',
            Weight: '',
            Gender: '',
            CatchRate: '',
            activeStep: 0,
            skipped: new Set(),            
        })
     }

    listPokeList(PokeList) {
        return (
            <GridListTile key={PokeList.url} style={{ height: 400, width: 400 }}>
                <img src={PokeList.url} height="200" width="200"></img>
                <GridListTileBar
                    title={PokeList.name}
                    subtitle={PokeList.type} />
            </GridListTile>
        );
    }

    hadleOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose =()=>{
        this.setState ({
            open: false
        });
    }

    handleNameChange = (e) => {
        this.setState({
            Name: e.target.value
        });
    }

    handleUrlChange = (e) => {
        this.setState({
            Url: e.target.value
        });
    }

    handleTypeChange = (e) => {
        this.setState({
            Type: e.target.value
        });
    }

    handleHeightChange = (e) => {
        this.setState({
            Height: e.target.value
        });
    }

    handleWeightChange = (e) => {
        this.setState({
            Weight: e.target.value
        });
    }

    handleGenderChange = (e) => {
        this.setState({
            Gender: e.target.value
        });
    }

    handleCacthRateChange = (e) => {
        this.setState({
            CatchRate: e.target.value
        });
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Paper style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center', height: 400, color: "black" }}>
                        <br />
                        <h1 style={{ alignSelf: 'center' }}>The Basics</h1>
                        <TextField style={{ textAlign: 'center' }} value={this.state.Name} label="Name" margin="normal" onChange={this.handleNameChange} />
                        <br />
                        <TextField value={this.state.Url} label="Image URL" margin="normal" onChange={this.handleUrlChange} />
                        <br />
                        <TextField value={this.state.Type} label="Type" margin="normal" onChange={this.handleTypeChange} />
                    </Paper>
                );
            case 1:
                return (
                    <Paper style={{ height: 400, color: "black" }}>
                        <br />
                        <h1>A little important information</h1>
                        <TextField value={this.state.Height} label="Height" onChange={this.handleHeightChange} />
                        <br />
                        <TextField value={this.state.Weight} label="Weight" onChange={this.handleWeightChange} />
                        <br />
                        <TextField value={this.state.Gender} label="Gender" onChange={this.handleGenderChange} />
                        <br />
                        <TextField value={this.state.CatchRate} label="Catch Rate" onChange={this.handleCacthRateChange} />
                        <br />
                    </Paper>
                );
            case 2:
                return (
                    <Paper style={{ color: "black", alignContent: 'center'}}>
                        <br />
                        <h1>Resume</h1>
                        <div>{<img src={this.state.Url}></img>}</div>
                        <br />
                        <div>{this.state.Name}</div>
                        <br />
                        <div>{this.state.Type}</div>
                        <br />
                        <div>{this.state.CatchRate}</div>
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



}



export default withRouter(PokeList);