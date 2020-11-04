import {MyXmlDocument, MyXmlElementNode} from "../xmlModel";
import {readXmlString} from "../xmlReader";
import {tlh_dig_config} from "./dummyConfigs";

const kbo_11_51_xml: string = `
<?xml-stylesheet href="HPMxml.css" type="text/css"?>
<AOxml xmlns:AO="http://hethiter.net/ns/AO/1.0"
       xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
       xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
       xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
       xml:space="preserve">
  <AOHeader>
    <docID>KBo 11.51</docID>
    <meta>
      <creation-date date='2016-04-15T16:55:36.58'/>
      <kor2 date='2020-10-18T21:18:40'/>
      <AOxml-creation date='2020-10-18T21:18:40'/>
      <annotation>
        <annot editor='auto' date=''/>
        <annot editor='' date=''/>
      </annotation>
    </meta>
  </AOHeader>
  <body>
    <div1 type='transliteration'>
      <text xml:lang='XXXlang'>
        <p>
          <s xml:lang='XXXlang'>
            <AO:Manuscripts>
              <AO:TxtPubl>KBo 11.51</AO:TxtPubl>
            </AO:Manuscripts>
            <lb txtid="KBo 11.51" lnr="Vs. III" lg="Hit"/>
          </s>
        </p>
        <parsep/>
        <p>
          <s>
            <lb txtid="KBo 11.51" lnr="Vs. III 1′" lg="Hit"/>
            <w><del_in/></w>
            <w><space c="34"/></w>
            <w mrp0sel='DEL'><del_fin/>x</w>
            <w trans='LUGAL' mrp0sel='  '
               mrp1=' LUGAL @ König @
          { a → NOM.SG(UNM)}
          { b → ACC.SG(UNM)}
          { c → NOM.PL(UNM)}
          { d → ACC.PL(UNM)}
          { e → GEN.SG(UNM)}
          { f → GEN.PL(UNM)}
          { g → D/L.SG(UNM)}
          { h → D/L.PL(UNM)}
          { i → ALL(UNM)}
          { j → ABL(UNM)}
          { k → INS(UNM)}
          { l → VOC.SG(UNM)}
          { m → VOC.PL(UNM)} @ 28.3.1.1 @ '
            ><sGr>LUGAL</sGr></w>
            <w trans='MUNUS.LUGAL' mrp0sel='  '
               mrp1=' MUNUS.LUGAL @ Königin @
          { a → NOM.SG(UNM)}
          { b → ACC.SG(UNM)}
          { c → NOM.PL(UNM)}
          { d → ACC.PL(UNM)}
          { e → GEN.SG(UNM)}
          { f → GEN.PL(UNM)}
          { g → D/L.SG(UNM)}
          { h → D/L.PL(UNM)}
          { i → ALL(UNM)}
          { j → ABL(UNM)}
          { k → INS(UNM)}
          { l → VOC.SG(UNM)}
          { m → VOC.PL(UNM)} @ 28.1.1.7 @ '
            ><sGr>MUNUS.LUGAL</sGr></w>
            <w trans='ŠUaš' mrp0sel='  '
               mrp1=' ŠU @ Hand @
          { a → FNL(a).NOM.SG.C}
          { b → GEN.PL}
          { c → D/L.PL} @ 28.10.2 @ '
            ><sGr>ŠU</sGr><d>MEŠ</d>-aš</w>
            <w trans='watar' mrp0sel='  '
               mrp1=' wātar @ Wasser @
            { a → NOM.SG.N}
            { b → ACC.SG.N}
            { c → STF} @ 14.1.3 @ '
            >wa-a-<del_in/>tar</w>
          </s>
        </p>
      </text>
    </div1>
  </body>
</AOxml>`;

export const kbo_11_51: MyXmlDocument = new MyXmlDocument(
    "kbo 11.51.xml",
    readXmlString(kbo_11_51_xml) as MyXmlElementNode,
    tlh_dig_config.name
);
