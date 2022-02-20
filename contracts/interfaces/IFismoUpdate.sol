// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.0;

import { FismoTypes } from "../domain/FismoTypes.sol";

/**
 * @title IFismoUpdate
 *
 * Interface for Fismo update functions
 * The ERC-165 identifier for this interface is 0xe29cbd4a
 *
 * @author Cliff Hall <cliff@futurescale.com> (https://twitter.com/seaofarrows)
 */
interface IFismoUpdate {

    /// Emitted when a new Machine is added to Fismo.
    event MachineAdded(bytes4 indexed machineId, string machineName);

    /// Emitted when a new State is added to Fismo.
    /// May be emitted multiple times during the addition of a Machine.
    event StateAdded(bytes4 indexed machineId, bytes4 indexed stateId, string stateName);

    /// Emitted when an existing State is updated.
    event StateUpdated(bytes4 indexed machineId, bytes4 indexed stateId, string stateName);

    /// Emitted when a new Transition is added to an existing State.
    /// May be emitted multiple times during the addition of a Machine or State.
    event TransitionAdded(bytes4 indexed machineId, bytes4 indexed stateId, string action, string targetStateName);

    /**
     * @notice Add a new Machine to Fismo.
     *
     * Emits:
     * - MachineAdded
     * - StateAdded
     * - TransitionAdded
     *
     * Reverts if:
     * - Caller is not contract owner
     * - Operator address is zero
     * - Machine id is not valid for Machine name
     * - Machine already exists
     *
     * @param _machine - the machine definition to add
     */
    function addMachine(FismoTypes.Machine memory _machine)
    external;

    /**
     * @notice Add a State to an existing Machine.
     *
     * Note:
     * - The new state will not be reachable by any action
     * - Add one or more transitions to other states, targeting the new state
     *
     * Emits:
     * - StateAdded
     * - TransitionAdded
     *
     * Reverts if:
     * - Caller is not contract owner
     * - State id is invalid
     * - Machine does not exist
     * - Any contained transition is invalid
     *
     * @param _machineId - the id of the machine
     * @param _state - the state to add to the machine
     */
    function addState(bytes4 _machineId, FismoTypes.State memory _state)
    external;

    /**
     * @notice Update an existing State in an existing Machine.
     *
     * Note:
     * - State name and id cannot be changed.
     *
     * Reverts if:
     * - Caller is not contract owner
     * - Machine does not exist
     * - State does not exist
     * - State id is invalid
     * - Any contained transition is invalid
     *
     * Use this when:
     * - Adding more than one transition
     * - Removing one or more transitions
     * - Changing exitGuarded, enterGuarded, guardLogic params
     *
     * @param _machineId - the id of the machine
     * @param _state - the state to update
     */
    function updateState(bytes4 _machineId, FismoTypes.State memory _state)
    external;

    /**
     * @notice Add a Transition to an existing State of an existing Machine.
     *
     * Emits:
     * - TransitionAdded
     *
     * Reverts if:
     * - Caller is not contract owner
     * - Machine does not exist
     * - State does not exist
     * - Action id is invalid
     * - Target state id is invalid
     *
     * Use this when:
     * - Adding only a single transition (use updateState for multiple)
     *
     * @param _machineId - the id of the machine
     * @param _stateId - the id of the state
     * @param _transition - the transition to add to the state
     */
    function addTransition(bytes4 _machineId, bytes4 _stateId, FismoTypes.Transition memory _transition)
    external;

}