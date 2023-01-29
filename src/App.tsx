import React, {useState} from "react";
import "./styles.css"

interface IDataRecord {
  label: string; // uniq
  value: number;
}

interface IAppProps {
  size?: number;
}

export class App extends React.Component<
    IAppProps,
    { list: IDataRecord[] }
    > {
  state = {
    list: Array.from({ length: this.props.size ?? 200 }, (_el, index) => ({
      label: `label ${index + 1}`,
      value: App.generateValue()
    }))
  };
    handleUpdate = (index: number) => {
        this.state.list[index].value = App.generateValue()
    };

  static generateValue() {
    return Math.round(100 + Math.random() * 900);
  }

  render() {
    return (
        <div>
          <h1>Test app</h1>
          {this.state.list.map((el, index) => (
              <Row data={el} index={index}  onUpdate={()=>this.handleUpdate(index)} />
          ))}
        </div>
    );
  }
}

export default function App2 ({size}: IAppProps) {

    const generateValue = () => Math.round(100 + Math.random() * 900)
    const list = Array.from({ length: size ?? 200 }, (_el, index) => ({
        label: `label ${index + 1}`,
        value: generateValue()
    }))
    const handleUpdate = (index: number) => list[index].value = generateValue()
    return <div>
        <h1>Test app func</h1>
        {list.map((el, index) => (
            <Row2 data={el} index={index}  onUpdate={()=>handleUpdate(index)} />
        ))}
    </div>
}

interface IRowProps {
  data: { label:string, value:number }; // TODO
  index: number;
  onUpdate:()=>void
}

class Row extends React.Component<IRowProps> {
   state = {renderCount:1};

  handleUpdate = () => {
      this.props.onUpdate()
      this.setState({renderCount: this.state.renderCount + 1})
  }

  render() {
    const {
      data: { label, value }
    } = this.props;


    return (
        <div>
          <span className="label">{label}:</span>
          <span>{value}</span> <span>({this.state.renderCount})</span>{" "}
          <button className="button" onClick={this.handleUpdate}>
            Update
          </button>
        </div>
    );
  }
}

function Row2 ({data: { label, value },onUpdate}:IRowProps) {
   const [renderCount, setRenderCount] = useState(1);

    const handleUpdate = () => {
      onUpdate()
        setRenderCount(s=>s+1)
  }

    return (
        <div>
          <span className="label">{label}:</span>
          <span>{value}</span> <span>({renderCount})</span>{" "}
          <button className="button" onClick={handleUpdate}>
            Update
          </button>
        </div>
    );
  }
