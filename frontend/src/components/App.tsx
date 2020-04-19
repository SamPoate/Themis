// import React, { FunctionComponent, useState } from 'react';
import * as React from 'react';
import { FC, useState, useReducer } from 'react';
import {
    Container,
    Grid,
    Table,
    Label,
    Form,
    Message,
    List,
    Segment,
    Responsive,
    Menu,
    Header,
    Button
} from 'semantic-ui-react';

import { getUsers, postUser } from '../api/api';

interface AppProps {
    compiler: string;
    framework: string;
}

interface UserState {
    displayName: string;
    username: string;
    password: string;
}

interface Event {
    name: string;
    value: string;
}

const initialState: UserState = {
    displayName: '',
    username: '',
    password: ''
};

export const reducer = (
    state = initialState,
    action: { type: string; payload: object }
) => {
    switch (action.type) {
        default:
            return { ...state, ...action.payload };
    }
};

export const App: FC<AppProps> = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [fixed, setFixed] = useState(false);
    const [apiCalled, setApiCalled] = useState(false);
    const [users, setUsers] = useState([]);

    const hideFixedMenu = () => setFixed(false);
    const showFixedMenu = () => setFixed(true);

    const handleChange = (_e: any, { name, value }: Event) => {
        dispatch({ type: 'default', payload: { [name]: value } });
    };

    const callApi = async () => {
        const response = await getUsers();

        setApiCalled(true);
        setUsers(
            response.data.map(
                (user: { display_name: string }) => user.display_name
            )
        );
    };

    const createUser = () => {
        const { displayName, username, password } = state;

        postUser({
            displayName,
            username,
            password
        });
    };

    return (
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Segment
                inverted
                textAlign="center"
                style={{ padding: '1em 0em' }}
                vertical
            >
                <Container>
                    <Menu inverted pointing secondary size="large">
                        <Menu.Item as="a" active>
                            Home
                        </Menu.Item>
                        <Menu.Item as="a">Teams</Menu.Item>
                        <Menu.Item position="right">
                            <Button as="a" inverted={!fixed}>
                                Log in
                            </Button>
                            <Button
                                as="a"
                                inverted={!fixed}
                                primary={fixed}
                                style={{ marginLeft: '0.5em' }}
                            >
                                Sign Up
                            </Button>
                        </Menu.Item>
                    </Menu>
                    <Header
                        as="h1"
                        inverted
                        style={{
                            fontSize: '4em',
                            fontWeight: 'bold',
                            margin: '1em 0'
                        }}
                    >
                        Who's round is it anyway?
                    </Header>
                </Container>
            </Segment>
            <Container text textAlign="left" style={{ margin: '1em 0' }}>
                {apiCalled ? (
                    <>
                        <Header as="h2">The Squad</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        Their round?
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Who</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        How many
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Set Round
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {users.map(user => (
                                    <Table.Row key={user}>
                                        <Table.Cell>
                                            <Label ribbon>Yes</Label>
                                        </Table.Cell>
                                        <Table.Cell>{user}</Table.Cell>
                                        <Table.Cell>{user}</Table.Cell>
                                        <Table.Cell>
                                            <Button>Their Round</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan="3">
                                        <Button
                                            onClick={() => setApiCalled(false)}
                                        >
                                            Reset
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </>
                ) : (
                    <Grid textAlign="center" verticalAlign="middle">
                        <Grid.Column>
                            <Header as="h2" color="blue" textAlign="center">
                                Create a User
                            </Header>
                            <Form size="large" onSubmit={createUser}>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        icon="glass martini"
                                        iconPosition="left"
                                        name="displayName"
                                        placeholder="Display Name"
                                        value={state.displayName}
                                        onChange={handleChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        name="username"
                                        placeholder="Username"
                                        value={state.username}
                                        onChange={handleChange}
                                    />
                                    <Form.Input
                                        fluid
                                        icon="lock"
                                        iconPosition="left"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        value={state.password}
                                        onChange={handleChange}
                                    />
                                    <Form.Button content="Submit" />
                                </Segment>
                            </Form>
                            <Message>
                                New to us? <a href="#">Sign Up</a>
                            </Message>
                        </Grid.Column>
                    </Grid>
                )}
                <Button style={{ margin: '1em 0' }} onClick={callApi}>
                    Get Rounds
                </Button>
            </Container>
            <Segment
                inverted
                vertical
                style={{
                    padding: '5em 0em',
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    width: '100vw'
                }}
            >
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header inverted as="h4" content="About" />
                                <List link inverted>
                                    <List.Item as="a">Contact Us</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Header as="h4" inverted>
                                    Footer
                                </Header>
                                <p>Down your pints now!</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </Responsive>
    );
};
