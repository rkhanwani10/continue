import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectCurrentToolCall } from "../../../../redux/selectors/selectCurrentToolCall";
import { cancelToolCall } from "../../../../redux/slices/sessionSlice";
import { callCurrentTool } from "../../../../redux/thunks/callCurrentTool";
import {
  getAltKeyLabel,
  getFontSize,
  getMetaKeyLabel,
  isJetBrains,
} from "../../../../util";
import { EnterButton } from "../../InputToolbar/EnterButton";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StopButton = styled.div`
  font-size: ${getFontSize() - 3}px;
  padding: 2px;
  padding-right: 4px;
  cursor: pointer;
`;

export function PendingToolCallToolbar() {
  const dispatch = useAppDispatch();
  const jetbrains = isJetBrains();
  const currentToolCall = useAppSelector(selectCurrentToolCall);

  return (
    <Container>
      <div className="text-description flex flex-row items-center pb-0.5 pr-1 text-xs">
        <span className="hidden sm:flex">Pending tool call</span>
      </div>

      <div className="flex gap-2 pb-0.5">
        <StopButton
          className="text-description"
          onClick={
            currentToolCall
              ? () => {
                  dispatch(
                    cancelToolCall({
                      toolCallId: currentToolCall.toolCallId,
                    }),
                  );
                }
              : undefined
          }
          data-testid="reject-tool-call-button"
        >
          {/* JetBrains overrides cmd+backspace, so we have to use another shortcut */}
          {jetbrains ? getAltKeyLabel() : getMetaKeyLabel()} ⌫ Cancel
        </StopButton>
        <EnterButton
          isPrimary={true}
          className="text-description"
          onClick={() => dispatch(callCurrentTool())}
          data-testid="accept-tool-call-button"
        >
          {getMetaKeyLabel()} ⏎ Continue
        </EnterButton>
      </div>
    </Container>
  );
}
