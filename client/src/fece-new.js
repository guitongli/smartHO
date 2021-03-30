import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Face() {
    const expressions = useSelector((state) => state && state.expressions);
}
