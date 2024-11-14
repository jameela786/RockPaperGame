import {Component} from 'react'
import {RiCloseLine} from 'react-icons/ri'
import Popup from 'reactjs-popup'
import {
  BgContainer,
  ScoreBoardContainer,
  ItemText,
  ScoreCardContainer,
  ItemTextScore,
  ChoiceBtn,
  ChoiceBtnImg,
  ChoiceContainer,
  Row,
  ResultChoiceContainer,
  ResultHeading,
  ResultStatus,
  PlayAgainButton,
  RulesBtn,
  PopupContainer,
  RulesImg,
  RulesContainer,
  CloseButton,
} from './StyledComponents'
class Game extends Component {
  state = {
    score: 0,
    isGameEnd: false,
    selectedYou: '',
    opponentSelected: '',
    gameStatus: '',
  }

  onSelectItem = id => {
    const {GamechoicesList} = this.props
    const randomSelectOpponent = Math.floor(Math.random() * 3)
    const oppselect = GamechoicesList[randomSelectOpponent].id
    this.setState(
      prevState => ({
        isGameEnd: true,
        selectedYou: id,
        opponentSelected: oppselect,
      }),
      this.getGameStatus,
    )
  }
  getGameStatus = () => {
    const {score, isGameEnd, selectedYou, opponentSelected} = this.state
    let WinStatus = ''

    if (selectedYou === 'SCISSORS' && opponentSelected === 'PAPER') {
      WinStatus = 'YOU WON'
    } else if (selectedYou === 'PAPER' && opponentSelected === 'ROCK') {
      WinStatus = 'YOU WON'
    } else if (selectedYou === 'ROCK' && opponentSelected === 'SCISSORS') {
      WinStatus = 'YOU WON'
    } else if (selectedYou === opponentSelected) {
      WinStatus = 'IT IS DRAW'
    } else {
      WinStatus = 'YOU LOSE'
    }
    console.log(
      'winstatus=',
      WinStatus,
      selectedYou === opponentSelected,
      selectedYou,
      opponentSelected,
    )
    if (WinStatus === 'YOU WON') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        gameStatus: 'YOU WON',
      }))
    } else if (WinStatus === 'YOU LOSE') {
      this.setState(prevState => ({
        score: prevState.score - 1,
        gameStatus: 'YOU LOSE',
      }))
    } else {
      this.setState({gameStatus: 'IT IS DRAW'})
    }
  }
  onClickPlayAgain = () => {
    this.setState({isGameEnd: false})
  }
  render() {
    const {score, isGameEnd, selectedYou, opponentSelected, gameStatus} =
      this.state
    const {GamechoicesList} = this.props
    const selectedYouId = GamechoicesList.find(item => item.id === selectedYou)
    let SelectedYouImg
    if (selectedYouId) {
      SelectedYouImg = selectedYouId.imageUrl
    }
    const opponentSelectedId = GamechoicesList.find(
      item => item.id === opponentSelected,
    )
    let opponentSelectedImg
    if (opponentSelectedId) {
      opponentSelectedImg = opponentSelectedId.imageUrl
    }

    console.log('selectedYou=', selectedYou, opponentSelected, gameStatus)

    return (
      <BgContainer>
        <ResultHeading>Rock Paper Scissors</ResultHeading>
        <ScoreBoardContainer>
          <div>
            <ItemText>ROCK</ItemText>
            <ItemText>PAPER</ItemText>
            <ItemText>SCISSORS</ItemText>
          </div>
          <ScoreCardContainer>
            <ItemTextScore>Score</ItemTextScore>
            <ItemTextScore>{score}</ItemTextScore>
          </ScoreCardContainer>
        </ScoreBoardContainer>
        {!isGameEnd && (
          <ChoiceContainer>
            <Row>
              <ChoiceBtn
                data-testid="scissorsButton"
                onClick={() => this.onSelectItem(GamechoicesList[1].id)}
              >
                <ChoiceBtnImg
                  src={GamechoicesList[1].imageUrl}
                  alt={GamechoicesList[1].id}
                />
              </ChoiceBtn>
              <ChoiceBtn
                data-testid="paperButton"
                onClick={() => this.onSelectItem(GamechoicesList[2].id)}
              >
                <ChoiceBtnImg
                  src={GamechoicesList[2].imageUrl}
                  alt={GamechoicesList[2].id}
                />
              </ChoiceBtn>
            </Row>
            <Row>
              <ChoiceBtn
                data-testid="rockButton"
                onClick={() => this.onSelectItem(GamechoicesList[0].id)}
              >
                <ChoiceBtnImg
                  src={GamechoicesList[0].imageUrl}
                  alt={GamechoicesList[0].id}
                />
              </ChoiceBtn>
            </Row>
          </ChoiceContainer>
        )}

        {isGameEnd && (
          <ResultChoiceContainer>
            <Row>
              <ChoiceBtn>
                <ResultHeading>YOU</ResultHeading>
                <ChoiceBtnImg src={SelectedYouImg} alt="your choice" />
              </ChoiceBtn>
              <ChoiceBtn>
                <ResultHeading>OPPONENT</ResultHeading>
                <ChoiceBtnImg
                  src={opponentSelectedImg}
                  alt="opponent choice "
                />
              </ChoiceBtn>
            </Row>
            <ResultStatus>{gameStatus}</ResultStatus>
            <PlayAgainButton onClick={this.onClickPlayAgain}>
              Play Again
            </PlayAgainButton>
          </ResultChoiceContainer>
        )}
        <PopupContainer>
          <Popup modal trigger={<RulesBtn>Rules</RulesBtn>}>
            {close => (
              <RulesContainer>
                <div>
                  <RulesImg
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
                <CloseButton
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </CloseButton>
              </RulesContainer>
            )}
          </Popup>
        </PopupContainer>
      </BgContainer>
    )
  }
}
export default Game
