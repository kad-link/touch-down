import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D AIRPORT TERMINAL & ATC TOWER BACKGROUND
 * Featuring:
 * - High-altitude background with distant airliner on descent glide path
 * - Architectural ATC tower with rotating violet volumetric beacon
 * - Curved terminal canopy and illuminated runway corridors
 * - Executive Sedan waiting at Pillar 2A Arrival Bay with quad LED headlights,
 *   violet underbody puddle lights, and curbside VIP luggage staging
 * - Deep Z-axis scroll-coupled kinematics: swooping from night sky & ATC down to
 *   a cinematic focus on the executive sedan as the user scrolls.
 */
export default function AirportScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08060D, 0.012); // Deep obsidian night fog

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // --- 2. LIGHTING (Dark Luxury, Deep Violet & Indigo) ---
    const ambientLight = new THREE.AmbientLight(0x0f0b1a, 0.75);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xa5b4fc, 0.9);
    moonLight.position.set(40, 80, 50);
    scene.add(moonLight);

    const terminalWarmLight = new THREE.PointLight(0xfcd34d, 1.8, 50);
    terminalWarmLight.position.set(0, 12, 10);
    scene.add(terminalWarmLight);

    const electricVioletLight = new THREE.PointLight(0x4C1D95, 2.2, 60);
    electricVioletLight.position.set(-20, 25, 20);
    scene.add(electricVioletLight);

    // Curbside Executive Bay Fill Light (Nocturnal Dark Violet Smudge)
    const curbFillLight = new THREE.PointLight(0x3B1A78, 1.4, 25);
    curbFillLight.position.set(-10, 4.5, 30);
    scene.add(curbFillLight);

    // Sedan Headlight Real-world Spotlight casting forward along roadway
    const headlightSpot = new THREE.SpotLight(0xEDE9FE, 4.5, 35, Math.PI / 5, 0.45, 1.2);
    headlightSpot.position.set(-9.2, 0.6, 32.5);
    headlightSpot.target.position.set(-9.2, 0, 52);
    scene.add(headlightSpot);
    scene.add(headlightSpot.target);

    // --- 3. MATERIALS ---
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0c0914,
      roughness: 0.3,
      metalness: 0.9
    });

    const towerShaftMat = new THREE.MeshStandardMaterial({
      color: 0x110d1c,
      roughness: 0.4,
      metalness: 0.7
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x1e1b4b,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.4,
      ior: 1.5
    });

    const warmGlassMat = new THREE.MeshStandardMaterial({
      color: 0xffeedd,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
      roughness: 0.2
    });

    const neonVioletMat = new THREE.MeshBasicMaterial({
      color: 0x5B21B6
    });

    const neonIndigoMat = new THREE.MeshBasicMaterial({
      color: 0x6366F1
    });

    const centerlineMat = new THREE.MeshBasicMaterial({
      color: 0xE0E7FF
    });

    const beaconRedMat = new THREE.MeshBasicMaterial({
      color: 0xDC2626
    });

    const navGreenMat = new THREE.MeshBasicMaterial({
      color: 0x10B981
    });

    const strobeMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
    });

    const amberLightMat = new THREE.MeshBasicMaterial({
      color: 0xD97706
    });

    // --- 4. ATC TOWER CONSTRUCTION ---
    const towerGroup = new THREE.Group();
    towerGroup.position.set(16, 0, -25);

    // Base podium
    const baseGeo = new THREE.CylinderGeometry(8, 10, 4, 16);
    const baseMesh = new THREE.Mesh(baseGeo, darkMetalMat);
    baseMesh.position.y = 2;
    towerGroup.add(baseMesh);

    // Main tower shaft (tapered)
    const shaftGeo = new THREE.CylinderGeometry(3.2, 4.8, 38, 24);
    const shaftMesh = new THREE.Mesh(shaftGeo, towerShaftMat);
    shaftMesh.position.y = 23;
    towerGroup.add(shaftMesh);

    // Vertical illuminated architectural fins
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const finGeo = new THREE.BoxGeometry(0.3, 36, 1.2);
      const finMesh = new THREE.Mesh(finGeo, neonVioletMat);
      finMesh.position.set(
        Math.cos(angle) * 3.9,
        23,
        Math.sin(angle) * 3.9
      );
      finMesh.rotation.y = angle;
      towerGroup.add(finMesh);
    }

    // ATC Observation Cab (Lower flared support)
    const cabLowerGeo = new THREE.CylinderGeometry(8, 3.2, 5, 16);
    const cabLower = new THREE.Mesh(cabLowerGeo, darkMetalMat);
    cabLower.position.y = 44.5;
    towerGroup.add(cabLower);

    // ATC Glass Observation Room
    const cabGlassGeo = new THREE.CylinderGeometry(8.2, 7.8, 4.5, 16, 1, true);
    const cabGlass = new THREE.Mesh(cabGlassGeo, warmGlassMat);
    cabGlass.position.y = 48.5;
    towerGroup.add(cabGlass);

    // ATC Roof & Radar Platform
    const cabRoofGeo = new THREE.CylinderGeometry(6, 8.4, 2, 16);
    const cabRoof = new THREE.Mesh(cabRoofGeo, darkMetalMat);
    cabRoof.position.y = 51.5;
    towerGroup.add(cabRoof);

    // Summit Spire
    const spireGeo = new THREE.CylinderGeometry(0.2, 0.8, 10, 8);
    const spire = new THREE.Mesh(spireGeo, darkMetalMat);
    spire.position.y = 57.5;
    towerGroup.add(spire);

    // Rotating Aeronautical Beacon Assembly
    const beaconGroup = new THREE.Group();
    beaconGroup.position.set(0, 53.5, 0);

    const beaconDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 12, 12),
      beaconRedMat
    );
    beaconGroup.add(beaconDome);

    // Sweeping Volumetric Beam
    const beamGeo = new THREE.ConeGeometry(5, 45, 16, 1, true);
    beamGeo.translate(0, -22.5, 0);
    beamGeo.rotateX(Math.PI / 2);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x3B1A78,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beaconGroup.add(beamMesh);

    towerGroup.add(beaconGroup);
    scene.add(towerGroup);

    // --- 5. TERMINAL BUILDING ARCHITECTURE ---
    const terminalGroup = new THREE.Group();
    terminalGroup.position.set(-22, 0, -40);

    // Parametric sweeping curved roof canopy
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-35, 0);
    roofShape.quadraticCurveTo(0, 18, 35, 0);
    roofShape.lineTo(33, -3);
    roofShape.quadraticCurveTo(0, 14, -33, -3);
    roofShape.closePath();

    const extrudeSettings = {
      depth: 45,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    };

    const roofGeo = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
    roofGeo.rotateX(Math.PI / 2);
    const roofMesh = new THREE.Mesh(roofGeo, darkMetalMat);
    roofMesh.position.set(0, 8, -20);
    terminalGroup.add(roofMesh);

    // Terminal Glass Curtain Wall Facade
    const facadeGeo = new THREE.BoxGeometry(60, 11, 38);
    const facadeMesh = new THREE.Mesh(facadeGeo, glassMat);
    facadeMesh.position.set(0, 5.5, 0);
    terminalGroup.add(facadeMesh);

    // Terminal Floor Slabs & Gate Glows
    for (let f = 1; f <= 3; f++) {
      const slabGeo = new THREE.BoxGeometry(62, 0.4, 40);
      const slabMesh = new THREE.Mesh(slabGeo, darkMetalMat);
      slabMesh.position.set(0, f * 3.5, 0);
      terminalGroup.add(slabMesh);
    }

    // Boarding Piers / Aero-bridges extending toward apron
    for (let p = -2; p <= 2; p++) {
      if (p === 0) continue;
      const pierGeo = new THREE.BoxGeometry(4, 4, 18);
      const pierMesh = new THREE.Mesh(pierGeo, darkMetalMat);
      pierMesh.position.set(p * 14, 4, 25);
      terminalGroup.add(pierMesh);

      // Gate docking light
      const gateLight = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 8, 8),
        amberLightMat
      );
      gateLight.position.set(p * 14, 6.2, 34);
      terminalGroup.add(gateLight);
    }

    scene.add(terminalGroup);

    // --- 6. DISTANT APPROACHING AIRLINER (Flight in Background Sky) ---
    const flightGroup = new THREE.Group();
    const flightInitialPos = new THREE.Vector3(38, 54, -115);
    flightGroup.position.copy(flightInitialPos);
    flightGroup.rotation.set(-0.06, Math.PI * 0.96, 0);

    // Fuselage
    const fuselageGeo = new THREE.CylinderGeometry(1.1, 1.1, 16, 16);
    fuselageGeo.rotateX(Math.PI / 2);
    const fuselageMesh = new THREE.Mesh(fuselageGeo, darkMetalMat);
    flightGroup.add(fuselageMesh);

    // Aerodynamic Nose
    const noseGeo = new THREE.ConeGeometry(1.1, 3.2, 16);
    noseGeo.rotateX(-Math.PI / 2);
    const noseMesh = new THREE.Mesh(noseGeo, darkMetalMat);
    noseMesh.position.set(0, 0, 9.6);
    flightGroup.add(noseMesh);

    // Tapered Tail Cone
    const tailConeGeo = new THREE.CylinderGeometry(0.3, 1.1, 4.5, 16);
    tailConeGeo.rotateX(Math.PI / 2);
    const tailConeMesh = new THREE.Mesh(tailConeGeo, darkMetalMat);
    tailConeMesh.position.set(0, 0.2, -10.2);
    flightGroup.add(tailConeMesh);

    // Cockpit Windshield Glow
    const cockpitGeo = new THREE.BoxGeometry(1.2, 0.45, 1.4);
    const cockpitMat = new THREE.MeshBasicMaterial({ color: 0x818CF8 });
    const cockpitMesh = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpitMesh.position.set(0, 0.65, 8.5);
    flightGroup.add(cockpitMesh);

    // Swept Wings (Left & Right)
    const wingGeo = new THREE.BoxGeometry(12, 0.15, 2.4);
    const leftWing = new THREE.Mesh(wingGeo, darkMetalMat);
    leftWing.position.set(-6.5, -0.2, 0.5);
    leftWing.rotation.set(0.04, 0.35, -0.05);
    flightGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, darkMetalMat);
    rightWing.position.set(6.5, -0.2, 0.5);
    rightWing.rotation.set(0.04, -0.35, 0.05);
    flightGroup.add(rightWing);

    // Vertical Stabilizer (Tail Fin)
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(-1.8, 4.2);
    finShape.lineTo(-0.6, 4.2);
    finShape.lineTo(1.8, 0);
    finShape.closePath();
    const finExtrude = new THREE.ExtrudeGeometry(finShape, { depth: 0.2, bevelEnabled: false });
    finExtrude.rotateY(Math.PI / 2);
    const vFinMesh = new THREE.Mesh(finExtrude, darkMetalMat);
    vFinMesh.position.set(0.1, 1.0, -9.5);
    flightGroup.add(vFinMesh);

    // Horizontal Stabilizers
    const hStabGeo = new THREE.BoxGeometry(5.5, 0.12, 1.6);
    const hStabMesh = new THREE.Mesh(hStabGeo, darkMetalMat);
    hStabMesh.position.set(0, 1.4, -11.0);
    flightGroup.add(hStabMesh);

    // Jet Engine Nacelles
    [-3.8, 3.8].forEach((side) => {
      const nacelleGeo = new THREE.CylinderGeometry(0.65, 0.65, 2.8, 12);
      nacelleGeo.rotateX(Math.PI / 2);
      const nacelleMesh = new THREE.Mesh(nacelleGeo, darkMetalMat);
      nacelleMesh.position.set(side, -1.0, 1.5);
      flightGroup.add(nacelleMesh);

      const intakeGeo = new THREE.CircleGeometry(0.55, 12);
      const intakeMat = new THREE.MeshBasicMaterial({ color: 0x4338CA });
      const intakeMesh = new THREE.Mesh(intakeGeo, intakeMat);
      intakeMesh.position.set(side, -1.0, 2.91);
      flightGroup.add(intakeMesh);
    });

    // Navigation & Strobe Lights
    const portNavLight = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), beaconRedMat);
    portNavLight.position.set(-12.8, -0.3, -1.5);
    flightGroup.add(portNavLight);

    const starNavLight = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), navGreenMat);
    starNavLight.position.set(12.8, -0.3, -1.5);
    flightGroup.add(starNavLight);

    const tailStrobe = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), strobeMat);
    tailStrobe.position.set(0, 5.3, -10.5);
    flightGroup.add(tailStrobe);

    // Twin Atmospheric Landing Light Beams
    [-2.5, 2.5].forEach((side) => {
      const landConeGeo = new THREE.ConeGeometry(2.5, 22, 12, 1, true);
      landConeGeo.translate(0, -11, 0);
      landConeGeo.rotateX(-Math.PI / 2 + 0.12);
      const landConeMat = new THREE.MeshBasicMaterial({
        color: 0xEDE9FE,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
      });
      const landConeMesh = new THREE.Mesh(landConeGeo, landConeMat);
      landConeMesh.position.set(side, -0.6, 3.5);
      flightGroup.add(landConeMesh);
    });

    scene.add(flightGroup);

    // --- 7. ARRIVAL PICKUP BAY & EXECUTIVE SEDAN (Foreground / Midground) ---
    const pickupGroup = new THREE.Group();
    pickupGroup.position.set(-10, 0, 30);

    // Curbside Pedestrian Platform / Staging Bay
    const curbGeo = new THREE.BoxGeometry(7, 0.35, 22);
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x0F0C18,
      roughness: 0.7,
      metalness: 0.3
    });
    const curbMesh = new THREE.Mesh(curbGeo, curbMat);
    curbMesh.position.set(-4.5, 0.175, 0);
    pickupGroup.add(curbMesh);

    // Illuminated Curb Edge Strip (Royal Violet Guidance Line)
    const curbEdgeGeo = new THREE.BoxGeometry(0.15, 0.38, 22);
    const curbEdgeMesh = new THREE.Mesh(curbEdgeGeo, neonVioletMat);
    curbEdgeMesh.position.set(-0.95, 0.19, 0);
    pickupGroup.add(curbEdgeMesh);

    // Architectural Pillar 2A
    const pillarGeo = new THREE.BoxGeometry(1.2, 9, 1.2);
    const pillarMesh = new THREE.Mesh(pillarGeo, darkMetalMat);
    pillarMesh.position.set(-4.8, 4.5, -2);
    pickupGroup.add(pillarMesh);

    // Pillar 2A Vertical Light Fin
    const pFinGeo = new THREE.BoxGeometry(0.1, 8.5, 1.3);
    const pFinMesh = new THREE.Mesh(pFinGeo, neonVioletMat);
    pFinMesh.position.set(-4.15, 4.5, -2);
    pickupGroup.add(pFinMesh);

    // Pillar 2A Header Sign "PILLAR 2A · EXECUTIVE BAY"
    const signGeo = new THREE.BoxGeometry(0.1, 0.8, 2.6);
    const signMesh = new THREE.Mesh(signGeo, neonIndigoMat);
    signMesh.position.set(-4.1, 7.2, -2);
    pickupGroup.add(signMesh);

    // VIP Luggage Staged Beside Pillar
    const lug1Geo = new THREE.BoxGeometry(0.65, 1.1, 0.45);
    const lug1Mesh = new THREE.Mesh(lug1Geo, darkMetalMat);
    lug1Mesh.position.set(-3.2, 0.9, -1.8);
    pickupGroup.add(lug1Mesh);

    const handleGeo = new THREE.BoxGeometry(0.08, 0.4, 0.3);
    const handleMesh = new THREE.Mesh(handleGeo, neonVioletMat);
    handleMesh.position.set(-3.2, 1.65, -1.8);
    pickupGroup.add(handleMesh);

    const lug2Geo = new THREE.BoxGeometry(0.55, 0.85, 0.38);
    const lug2Mesh = new THREE.Mesh(lug2Geo, towerShaftMat);
    lug2Mesh.position.set(-2.8, 0.77, -0.9);
    lug2Mesh.rotation.y = 0.25;
    pickupGroup.add(lug2Mesh);

    // --- EXECUTIVE SEDAN MODEL ---
    const sedanGroup = new THREE.Group();
    sedanGroup.position.set(0.8, 0, 0);
    sedanGroup.rotation.y = -0.06;

    // 1. Lower Chassis (Long Wheelbase Executive Sedan)
    const chassisGeo = new THREE.BoxGeometry(2.0, 0.55, 4.8);
    const chassisMesh = new THREE.Mesh(chassisGeo, darkMetalMat);
    chassisMesh.position.set(0, 0.48, 0);
    sedanGroup.add(chassisMesh);

    // Front Bumper / Splitter
    const bumperGeo = new THREE.BoxGeometry(1.95, 0.28, 0.6);
    const bumperMesh = new THREE.Mesh(bumperGeo, darkMetalMat);
    bumperMesh.position.set(0, 0.32, 2.3);
    sedanGroup.add(bumperMesh);

    // Rear Diffuser
    const diffuserGeo = new THREE.BoxGeometry(1.95, 0.28, 0.5);
    const diffuserMesh = new THREE.Mesh(diffuserGeo, darkMetalMat);
    diffuserMesh.position.set(0, 0.32, -2.3);
    sedanGroup.add(diffuserMesh);

    // 2. Cabin / Greenhouse (Sleek Tapered Coupe-Sedan Profile)
    const cabinGeo = new THREE.BoxGeometry(1.65, 0.62, 2.4);
    const cabinMesh = new THREE.Mesh(cabinGeo, darkMetalMat);
    cabinMesh.position.set(0, 1.02, -0.2);
    sedanGroup.add(cabinMesh);

    // Glass Windows (Tinted Indigo-Black Physical Material)
    const windowsGeo = new THREE.BoxGeometry(1.7, 0.52, 2.2);
    const windowsMesh = new THREE.Mesh(windowsGeo, glassMat);
    windowsMesh.position.set(0, 1.04, -0.2);
    sedanGroup.add(windowsMesh);

    // Slanted Windshield
    const windshieldGeo = new THREE.BoxGeometry(1.64, 0.08, 0.9);
    windshieldGeo.rotateX(Math.PI / 4.2);
    const windshieldMesh = new THREE.Mesh(windshieldGeo, glassMat);
    windshieldMesh.position.set(0, 0.98, 1.15);
    sedanGroup.add(windshieldMesh);

    // Rear Windshield
    const rearGlassGeo = new THREE.BoxGeometry(1.64, 0.08, 0.85);
    rearGlassGeo.rotateX(-Math.PI / 4.5);
    const rearGlassMesh = new THREE.Mesh(rearGlassGeo, glassMat);
    rearGlassMesh.position.set(0, 0.98, -1.5);
    sedanGroup.add(rearGlassMesh);

    // 3. Quad LED Headlight Modules
    const hlMat = new THREE.MeshBasicMaterial({ color: 0xF5F3FF });
    [-0.75, 0.75].forEach((side) => {
      const hlGeo = new THREE.BoxGeometry(0.35, 0.12, 0.15);
      const hlMesh = new THREE.Mesh(hlGeo, hlMat);
      hlMesh.position.set(side, 0.56, 2.4);
      sedanGroup.add(hlMesh);

      // Volumetric Headlight Beams projecting forward onto the driveway
      const hlBeamGeo = new THREE.ConeGeometry(2.2, 18, 12, 1, true);
      hlBeamGeo.translate(0, -9, 0);
      hlBeamGeo.rotateX(-Math.PI / 2 + 0.08);
      const hlBeamMat = new THREE.MeshBasicMaterial({
        color: 0xEDE9FE,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide
      });
      const hlBeamMesh = new THREE.Mesh(hlBeamGeo, hlBeamMat);
      hlBeamMesh.position.set(side, 0.55, 2.5);
      sedanGroup.add(hlBeamMesh);
    });

    // 4. Rear Continuous OLED Lightbar
    const rlMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
    const rearLightbarGeo = new THREE.BoxGeometry(1.75, 0.08, 0.1);
    const rearLightbar = new THREE.Mesh(rearLightbarGeo, rlMat);
    rearLightbar.position.set(0, 0.62, -2.4);
    sedanGroup.add(rearLightbar);

    // 5. Signature Royal Violet Underbody Puddle Light (Dark Violet Ground Smudge)
    const puddleGeo = new THREE.PlaneGeometry(2.4, 4.6);
    puddleGeo.rotateX(-Math.PI / 2);
    const puddleMat = new THREE.MeshBasicMaterial({
      color: 0x3B1A78,
      transparent: true,
      opacity: 0.25
    });
    const puddleMesh = new THREE.Mesh(puddleGeo, puddleMat);
    puddleMesh.position.set(0, 0.02, 0);
    sedanGroup.add(puddleMesh);

    // 6. Alloy Wheels (4 wheels with chrome spoke rims)
    const wheelPositions = [
      [-1.02, 0.35, 1.45],
      [1.02, 0.35, 1.45],
      [-1.02, 0.35, -1.45],
      [1.02, 0.35, -1.45]
    ];

    const tireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 16);
    tireGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x050408,
      roughness: 0.85
    });

    const rimGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.24, 12);
    rimGeo.rotateZ(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xD8B4FE,
      metalness: 0.95,
      roughness: 0.15
    });

    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(wx, wy, wz);

      const tire = new THREE.Mesh(tireGeo, tireMat);
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(rimGeo, rimMat);
      wheelGroup.add(rim);

      sedanGroup.add(wheelGroup);
    });

    pickupGroup.add(sedanGroup);
    scene.add(pickupGroup);

    // --- 8. RUNWAY, APRON & COMMUTER CORRIDORS ---
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x050408,
      roughness: 0.85,
      metalness: 0.2
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    scene.add(groundMesh);

    // Runway Centerline & Edge Lights
    const runwayGroup = new THREE.Group();
    runwayGroup.position.set(35, 0.05, 0);

    // Runway strip
    const stripGeo = new THREE.PlaneGeometry(24, 250);
    stripGeo.rotateX(-Math.PI / 2);
    const stripMat = new THREE.MeshStandardMaterial({
      color: 0x040306,
      roughness: 0.6
    });
    const strip = new THREE.Mesh(stripGeo, stripMat);
    runwayGroup.add(strip);

    // Dual Edge Lights (Cool Indigo & Deep Amber)
    const lightInstances = 35;
    for (let i = 0; i < lightInstances; i++) {
      const zPos = -120 + i * 7;
      
      const leftLight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8),
        i % 2 === 0 ? neonIndigoMat : amberLightMat
      );
      leftLight.position.set(-12, 0.3, zPos);
      runwayGroup.add(leftLight);

      const rightLight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8),
        i % 2 === 0 ? neonIndigoMat : amberLightMat
      );
      rightLight.position.set(12, 0.3, zPos);
      runwayGroup.add(rightLight);
    }

    // Runway Centerline Dashes (Cool White-Lavender)
    for (let i = 0; i < 20; i++) {
      const dashGeo = new THREE.PlaneGeometry(0.8, 5);
      dashGeo.rotateX(-Math.PI / 2);
      const dashMesh = new THREE.Mesh(dashGeo, centerlineMat);
      dashMesh.position.set(0, 0.08, -110 + i * 12);
      runwayGroup.add(dashMesh);
    }

    scene.add(runwayGroup);

    // --- 9. FLOWING ARTERIAL HIGHWAY CORRIDORS (Ride-Pooling Lines) ---
    const corridorColors = [0x4C1D95, 0x3730A3, 0x2E1065, 0x1E1B4B];

    for (let c = 0; c < 4; c++) {
      const xOffset = -25 + c * 10;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xOffset, 0.2, -15),
        new THREE.Vector3(xOffset * 0.7, 0.2, 20),
        new THREE.Vector3(xOffset * 1.4, 0.2, 60),
        new THREE.Vector3(xOffset * 2.2, 0.2, 110)
      ]);

      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.25, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: corridorColors[c],
        transparent: true,
        opacity: 0.35
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tubeMesh);
    }

    // --- 10. ATMOSPHERIC NIGHT SKY PARTICLES ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePos[p] = (Math.random() - 0.5) * 220;
      particlePos[p + 1] = Math.random() * 85 + 5;
      particlePos[p + 2] = (Math.random() - 0.5) * 220;
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePos, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x818CF8,
      size: 0.6,
      transparent: true,
      opacity: 0.35
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 11. SCROLL KINEMATICS & ORBITAL CAMERA INTERPOLATION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Camera Waypoint Splines:
    // Scroll 0.0 (Hero): High view framing ATC tower & descending flight in night sky
    // Scroll 0.25 (Features): Gliding down over terminal canopy and runway edge lights
    // Scroll 0.50 (Corridors): Swooping down toward the arrival curb platform
    // Scroll 0.75 (Calculator): Direct focus on the waiting executive sedan at Pillar 2A
    // Scroll 1.0 (Hubs/Footer): Low beauty quarter angle framing the sedan with terminal & ATC glow
    const cameraKeyframes = [
      { progress: 0.0, pos: new THREE.Vector3(14, 25, 68), look: new THREE.Vector3(26, 42, -50) },
      { progress: 0.25, pos: new THREE.Vector3(2, 17, 56), look: new THREE.Vector3(10, 22, -15) },
      { progress: 0.50, pos: new THREE.Vector3(-4.5, 9.5, 48), look: new THREE.Vector3(-8.5, 3.0, 28) },
      { progress: 0.75, pos: new THREE.Vector3(-6.5, 4.2, 42), look: new THREE.Vector3(-9.2, 1.4, 29.5) },
      { progress: 1.0, pos: new THREE.Vector3(-7.2, 2.4, 38.5), look: new THREE.Vector3(-9.2, 1.2, 29.5) }
    ];

    function getInterpolatedCamera(p) {
      const clampedP = Math.max(0, Math.min(1, p));
      let idx = 0;
      for (let i = 0; i < cameraKeyframes.length - 1; i++) {
        if (clampedP >= cameraKeyframes[i].progress && clampedP <= cameraKeyframes[i + 1].progress) {
          idx = i;
          break;
        }
      }
      const k1 = cameraKeyframes[idx];
      const k2 = cameraKeyframes[idx + 1];
      const localT = (clampedP - k1.progress) / (k2.progress - k1.progress);
      const smoothT = 0.5 * (1 - Math.cos(localT * Math.PI));

      const pos = new THREE.Vector3().lerpVectors(k1.pos, k2.pos, smoothT);
      const look = new THREE.Vector3().lerpVectors(k1.look, k2.look, smoothT);
      return { pos, look };
    }

    const currentCamPos = new THREE.Vector3(14, 25, 68);
    const currentLookAt = new THREE.Vector3(26, 42, -50);

    // --- 12. ANIMATION TICKER ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // 1. Rotate Beacon & Radar Sweep
      beaconGroup.rotation.y = elapsedTime * 1.8;

      // 2. Pulse Terminal Ambient Lights (Soft, Atmospheric Smudge)
      terminalWarmLight.intensity = 2.0 + Math.sin(elapsedTime * 2) * 0.3;
      electricVioletLight.intensity = 1.9 + Math.cos(elapsedTime * 1.5) * 0.3;

      // 3. Distant Flight Approach Glide & Strobe Pulse
      flightGroup.position.z += 0.06;
      flightGroup.position.y -= 0.012;
      flightGroup.position.x -= 0.008;
      if (flightGroup.position.z > -25) {
        flightGroup.position.copy(flightInitialPos);
      }
      flightGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.025;
      flightGroup.rotation.x = -0.06 + Math.sin(elapsedTime * 0.3) * 0.008;
      tailStrobe.scale.setScalar(Math.sin(elapsedTime * 8) > 0.75 ? 1.8 : 0.8);

      // 4. Subtle Sedan Suspension Breathing & Puddle Light Pulse
      sedanGroup.position.y = Math.sin(elapsedTime * 3.0) * 0.008;
      puddleMat.opacity = 0.22 + Math.sin(elapsedTime * 2.0) * 0.04;

      // 5. Gentle Sway on Atmospheric Particles
      particles.rotation.y = elapsedTime * 0.02;

      // 6. Smooth Mouse Parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // 7. Scroll Progress Coupling (Lenis window.lenis or document scroll)
      let scrollProgress = 0;
      if (window.lenis) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = maxScroll > 0 ? window.lenis.scroll / maxScroll : 0;
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      }

      const targetCam = getInterpolatedCamera(scrollProgress);

      targetCam.pos.x += mouseX * 3.5;
      targetCam.pos.y += -mouseY * 2.5;

      // Inertia interpolation
      currentCamPos.lerp(targetCam.pos, 0.08);
      currentLookAt.lerp(targetCam.look, 0.08);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: 0.95
      }}
      aria-hidden="true"
    />
  );
}
